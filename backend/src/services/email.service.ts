import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/env';
import logger from '../utils/logger';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  /**
   * Initialize email transporter
   */
  private initializeTransporter(): void {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD) {
      logger.warn('Email configuration not found. Email service disabled.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT || 587,
        secure: env.SMTP_SECURE || false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD
        }
      });

      logger.info('Email service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
    }
  }

  /**
   * Send email
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    if (!this.transporter) {
      logger.warn('Email service not configured. Skipping email send.');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: env.EMAIL_FROM || env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      });

      logger.info(`Email sent successfully to: ${options.to}`);
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  /**
   * Send lead notification email
   */
  async sendLeadNotification(leadData: {
    studentName?: string;
    parentName?: string;
    email: string;
    phone?: string;
    message?: string;
  }): Promise<void> {
    const html = `
      <h2>New Admission Inquiry</h2>
      ${leadData.studentName ? `<p><strong>Student Name:</strong> ${leadData.studentName}</p>` : ''}
      ${leadData.parentName ? `<p><strong>Parent Name:</strong> ${leadData.parentName}</p>` : ''}
      <p><strong>Email:</strong> ${leadData.email}</p>
      ${leadData.phone ? `<p><strong>Phone:</strong> ${leadData.phone}</p>` : ''}
      ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ''}
      <p>Please follow up with this inquiry as soon as possible.</p>
    `;

    await this.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: 'New Admission Inquiry - Wheels Enchntment',
      html
    });
  }

  /**
   * Send welcome email to lead
   */
  async sendWelcomeEmail(to: string, studentName?: string): Promise<void> {
    const name = studentName || 'Student';
    const html = `
      <h2>Welcome to Wheels Enchntment
!</h2>
      <p>Dear Parent/Guardian,</p>
      <p>Thank you for your interest in enrolling ${name} at Wheels Enchntment
.</p>
      <p>We have received your inquiry and our team will contact you shortly to discuss the next steps.</p>
      <p>In the meantime, feel free to reach out to us at:</p>
      <ul>
        <li>Email: Wheelsenchntment27@gmail.com</li>
        <li>Phone: +91 9674242870</li>
      </ul>
      <p>Best regards,<br>Wheels Enchntment
 Team</p>
    `;

    await this.sendEmail({
      to,
      subject: 'Thank You for Your Interest - Wheels Enchntment',
      html
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await this.sendEmail({
      to,
      subject: 'Password Reset - Wheels Enchntment
',
      html
    });
  }

  /**
   * Send lead status update email
   */
  async sendLeadStatusUpdate(
    to: string,
    studentName: string | undefined,
    status: string
  ): Promise<void> {
    const name = studentName || 'the student';
    let message = '';

    switch (status) {
      case 'Contacted':
        message = 'We have reviewed your application and will be in touch soon.';
        break;
      case 'Enrolled':
        message = 'Congratulations! Your enrollment has been confirmed. Welcome to Wheels Enchntment
        !';
        break;
      case 'Rejected':
        message = 'Unfortunately, we are unable to proceed with your application at this time.';
        break;
      default:
        message = 'Your application status has been updated.';
    }

    const html = `
      <h2>Application Status Update</h2>
      <p>Dear Parent/Guardian,</p>
      <p>This is to inform you that the status of ${name}'s application has been updated to: <strong>${status}</strong></p>
      <p>${message}</p>
      <p>If you have any questions, please contact us.</p>
      <p>Best regards,<br>Wheels Enchntment
 Team</p>
    `;

    await this.sendEmail({
      to,
      subject: `Application Status Update - ${status}`,
      html
    });
  }
}

export default new EmailService();
