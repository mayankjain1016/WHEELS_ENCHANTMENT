import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Lead from '../models/Lead';
import emailService from '../services/email.service';
import { paginate, getPaginationParams } from '../utils/pagination';

/**
 * @route   POST /api/v1/leads
 * @desc    Create new lead (Public form submission)
 * @access  Public
 */
export const createLead = asyncHandler(async (req: Request, res: Response) => {
  console.log('=== LEAD SUBMISSION DEBUG START ===');
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('Content-Type:', req.headers['content-type']);
  
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log('Files received:', files ? Object.keys(files) : 'No files');
  
  const leadData = { ...req.body };
  console.log('Lead Data before processing:', JSON.stringify(leadData, null, 2));

  // Handle photo upload
  if (files?.photo?.[0]) {
    console.log('Processing photo upload...');
    const imageService = (await import('../services/image.service')).default;
    const processed = await imageService.processImage(files.photo[0].buffer, 'leads', {
      maxWidth: 800,
      maxHeight: 800,
      thumbnailSize: 200,
      quality: 85
    });
    leadData.photo = processed.optimized.url;
    console.log('Photo processed:', leadData.photo);
  }

  // Handle aadhar card upload
  if (files?.aadharCard?.[0]) {
    console.log('Processing aadhar card upload...');
    const imageService = (await import('../services/image.service')).default;
    const processed = await imageService.processImage(files.aadharCard[0].buffer, 'leads', {
      maxWidth: 1200,
      maxHeight: 1200,
      thumbnailSize: 300,
      quality: 90
    });
    leadData.aadharCard = processed.optimized.url;
    console.log('Aadhar card processed:', leadData.aadharCard);
  }

  // Convert dateOfBirth string to Date
  if (leadData.dateOfBirth) {
    leadData.dateOfBirth = new Date(leadData.dateOfBirth);
    console.log('Date of birth converted:', leadData.dateOfBirth);
  }

  console.log('Creating lead in database...');
  const lead = await Lead.create(leadData);
  console.log('Lead created successfully:', lead._id);

  // Send notification emails
  try {
    console.log('Sending notification emails...');
    await emailService.sendLeadNotification({
      studentName: lead.studentName,
      parentName: lead.fatherName,
      email: lead.email,
      phone: lead.fatherMobile,
      message: lead.message
    });

    await emailService.sendWelcomeEmail(lead.email, lead.studentName);
    console.log('Emails sent successfully');
  } catch (error) {
    // Don't fail the request if email fails
    console.error('Email sending failed:', error);
  }

  console.log('=== LEAD SUBMISSION DEBUG END ===');
  ApiResponse.created(res, { lead }, 'Your inquiry has been submitted successfully. We will contact you soon!');
});

/**
 * @route   GET /api/v1/leads
 * @desc    Get all leads with filters
 * @access  Private (Admin)
 */
export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort } = getPaginationParams(req.query);
  const { status, source, experienceLevel, assignedTo, search, fromDate, toDate } = req.query;

  // Build filter
  const filter: any = {};
  
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (assignedTo) filter.assignedTo = assignedTo;
  
  if (search) {
    filter.$text = { $search: search as string };
  }
  
  if (fromDate || toDate) {
    filter.submittedAt = {};
    if (fromDate) filter.submittedAt.$gte = new Date(fromDate as string);
    if (toDate) filter.submittedAt.$lte = new Date(toDate as string);
  }

  // Query with pagination
  const query = Lead.find(filter)
    .populate('assignedTo', 'name email')
    .populate('notes.addedBy', 'name');
    
  const result = await paginate(query, { page, limit, sort: sort || '-submittedAt' });

  ApiResponse.paginated(
    res,
    result.data,
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total,
    'Leads retrieved successfully'
  );
});

/**
 * @route   GET /api/v1/leads/:id
 * @desc    Get lead by ID
 * @access  Private (Admin)
 */
export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('notes.addedBy', 'name');

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  ApiResponse.success(res, { lead }, 'Lead retrieved successfully');
});

/**
 * @route   PUT /api/v1/leads/:id
 * @desc    Update lead
 * @access  Private (Admin)
 */
export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  const oldStatus = lead.status;

  // Update lead
  Object.assign(lead, req.body);
  await lead.save();

  // Send email if status changed
  if (req.body.status && req.body.status !== oldStatus) {
    try {
      await emailService.sendLeadStatusUpdate(
        lead.email,
        lead.studentName,
        lead.status
      );
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  await lead.populate('assignedTo notes.addedBy');

  ApiResponse.success(res, { lead }, 'Lead updated successfully');
});

/**
 * @route   PATCH /api/v1/leads/:id/status
 * @desc    Update lead status
 * @access  Private (Admin)
 */
export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  const oldStatus = lead.status;
  lead.status = status;
  await lead.save();

  // Send email notification
  if (status !== oldStatus) {
    try {
      await emailService.sendLeadStatusUpdate(
        lead.email,
        lead.studentName,
        status
      );
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  ApiResponse.success(res, { lead }, 'Lead status updated successfully');
});

/**
 * @route   PATCH /api/v1/leads/:id/assign
 * @desc    Assign lead to admin
 * @access  Private (Admin)
 */
export const assignLead = asyncHandler(async (req: Request, res: Response) => {
  const { assignedTo } = req.body;

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { assignedTo },
    { new: true, runValidators: true }
  ).populate('assignedTo', 'name email');

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  ApiResponse.success(res, { lead }, 'Lead assigned successfully');
});

/**
 * @route   POST /api/v1/leads/:id/notes
 * @desc    Add note to lead
 * @access  Private (Admin)
 */
export const addLeadNote = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;

  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  lead.notes.push({
    text,
    addedBy: req.user!._id as any,
    addedAt: new Date()
  });

  await lead.save();
  await lead.populate('notes.addedBy', 'name');

  ApiResponse.success(res, { lead }, 'Note added successfully');
});

/**
 * @route   DELETE /api/v1/leads/:id
 * @desc    Delete lead
 * @access  Private (Admin)
 */
export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw ApiError.notFound('Lead not found');
  }

  await lead.deleteOne();

  ApiResponse.success(res, null, 'Lead deleted successfully');
});

/**
 * @route   GET /api/v1/leads/stats/dashboard
 * @desc    Get lead statistics for dashboard
 * @access  Private (Admin)
 */
export const getLeadStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await Lead.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalLeads = await Lead.countDocuments();
  const todayLeads = await Lead.countDocuments({
    submittedAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0))
    }
  });

  const statusCounts = stats.reduce((acc, stat) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {} as Record<string, number>);

  ApiResponse.success(res, {
    totalLeads,
    todayLeads,
    statusCounts,
    newLeads: statusCounts['New'] || 0,
    contacted: statusCounts['Contacted'] || 0,
    enrolled: statusCounts['Enrolled'] || 0,
    rejected: statusCounts['Rejected'] || 0
  }, 'Lead statistics retrieved successfully');
});
