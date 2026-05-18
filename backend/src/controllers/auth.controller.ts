import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import authService from '../services/auth.service';
import { env } from '../config/env';

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.login(email, password);

  // Set access token in HTTP-only cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  ApiResponse.success(
    res,
    { user },
    'Login successful'
  );
});

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register new admin (super_admin only)
 * @access  Private (super_admin)
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const user = await authService.createAdmin({
    name,
    email,
    password,
    role
  });

  ApiResponse.created(res, { user }, 'Admin user created successfully');
});

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const cookieToken = req.cookies?.refreshToken;

  if (!cookieToken) {
    res.status(400).json({
      success: false,
      message: 'Refresh token is required'
    });
    return;
  }

  const tokens = await authService.refreshAccessToken(cookieToken);

  // Update access token in cookie
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  // Update refresh token in cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  ApiResponse.success(res, { success: true }, 'Token refreshed successfully');
});

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user!._id;

  await authService.logout(userId);

  // Clear both cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  ApiResponse.success(res, null, 'Logout successful');
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user!._id;

  const user = await authService.getCurrentUser(userId);

  ApiResponse.success(res, { user }, 'User retrieved successfully');
});

/**
 * @route   POST /api/v1/auth/change-password
 * @desc    Change password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user!._id;
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(userId, currentPassword, newPassword);

  // Clear both cookies to force re-login
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  ApiResponse.success(res, null, 'Password changed successfully. Please login again.');
});
