import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Location from '../models/Location';
import Testimonial from '../models/Testimonial';
import Setting from '../models/Setting';

// ============ LOCATION CONTROLLERS ============

export const getLocations = asyncHandler(async (_req: Request, res: Response) => {
  const locations = await Location.find({ isActive: true }).sort('displayOrder');
  ApiResponse.success(res, { locations }, 'Locations retrieved successfully');
});

export const createLocation = asyncHandler(async (req: Request, res: Response) => {
  const location = await Location.create(req.body);
  ApiResponse.created(res, { location }, 'Location created successfully');
});

export const updateLocation = asyncHandler(async (req: Request, res: Response) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!location) throw ApiError.notFound('Location not found');
  ApiResponse.success(res, { location }, 'Location updated successfully');
});

export const deleteLocation = asyncHandler(async (req: Request, res: Response) => {
  const location = await Location.findByIdAndDelete(req.params.id);
  if (!location) throw ApiError.notFound('Location not found');
  ApiResponse.success(res, null, 'Location deleted successfully');
});

// ============ TESTIMONIAL CONTROLLERS ============

export const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
  const filter: any = { isApproved: true };
  if (req.query.isFeatured) filter.isFeatured = req.query.isFeatured === 'true';
  
  const testimonials = await Testimonial.find(filter).sort('displayOrder');
  ApiResponse.success(res, { testimonials }, 'Testimonials retrieved successfully');
});

export const getAllTestimonials = asyncHandler(async (_req: Request, res: Response) => {
  const testimonials = await Testimonial.find().sort('-createdAt');
  ApiResponse.success(res, { testimonials }, 'All testimonials retrieved successfully');
});

export const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  ApiResponse.created(res, { testimonial }, 'Testimonial created successfully');
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!testimonial) throw ApiError.notFound('Testimonial not found');
  ApiResponse.success(res, { testimonial }, 'Testimonial updated successfully');
});

export const approveTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw ApiError.notFound('Testimonial not found');
  
  testimonial.isApproved = !testimonial.isApproved;
  await testimonial.save();
  ApiResponse.success(res, { testimonial }, 'Testimonial approval status updated');
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw ApiError.notFound('Testimonial not found');
  ApiResponse.success(res, null, 'Testimonial deleted successfully');
});

// ============ SETTING CONTROLLERS ============

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  
  const settings = await Setting.find(filter);
  ApiResponse.success(res, { settings }, 'Settings retrieved successfully');
});

export const getPublicSettings = asyncHandler(async (_req: Request, res: Response) => {
  const publicKeys = ['site_name', 'contact_email', 'contact_phone', 'google_form_link', 'facebook_url', 'instagram_url'];
  const settings = await Setting.find({ key: { $in: publicKeys } });
  
  const settingsObj = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, any>);
  
  ApiResponse.success(res, settingsObj, 'Public settings retrieved successfully');
});

export const getSettingByKey = asyncHandler(async (req: Request, res: Response) => {
  const setting = await Setting.findOne({ key: req.params.key });
  if (!setting) throw ApiError.notFound('Setting not found');
  ApiResponse.success(res, { setting }, 'Setting retrieved successfully');
});

export const updateSetting = asyncHandler(async (req: Request, res: Response) => {
  const { value } = req.body;
  
  let setting = await Setting.findOne({ key: req.params.key });
  
  if (!setting) {
    setting = await Setting.create({ key: req.params.key, ...req.body });
  } else {
    setting.value = value;
    if (req.body.description) setting.description = req.body.description;
    await setting.save();
  }
  
  ApiResponse.success(res, { setting }, 'Setting updated successfully');
});

export const deleteSetting = asyncHandler(async (req: Request, res: Response) => {
  const setting = await Setting.findOneAndDelete({ key: req.params.key });
  if (!setting) throw ApiError.notFound('Setting not found');
  ApiResponse.success(res, null, 'Setting deleted successfully');
});
