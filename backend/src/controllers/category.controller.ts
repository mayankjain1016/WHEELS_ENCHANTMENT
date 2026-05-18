import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import { generateUniqueSlug } from '../utils/slugify';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  // For admin, return all categories. For public, return only active ones.
  const filter: any = {};
  
  // Check if request is from admin (has auth token)
  if (!req.user) {
    filter.isActive = true;
  }
  
  const categories = await Category.find(filter).sort('displayOrder');
  ApiResponse.success(res, { categories }, 'Categories retrieved successfully');
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');
  
  const subcategories = await Subcategory.find({ categoryId: category._id, isActive: true });
  ApiResponse.success(res, { category, subcategories }, 'Category retrieved successfully');
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const slug = await generateUniqueSlug(req.body.name, Category);
  const category = await Category.create({ ...req.body, slug });
  ApiResponse.created(res, { category }, 'Category created successfully');
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');
  
  if (req.body.name && req.body.name !== category.name) {
    req.body.slug = await generateUniqueSlug(req.body.name, Category);
  }
  
  Object.assign(category, req.body);
  await category.save();
  ApiResponse.success(res, { category }, 'Category updated successfully');
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');
  
  await Subcategory.deleteMany({ categoryId: category._id });
  await category.deleteOne();
  ApiResponse.success(res, null, 'Category deleted successfully');
});

export const getSubcategories = asyncHandler(async (req: Request, res: Response) => {
  const subcategories = await Subcategory.find({ categoryId: req.params.categoryId, isActive: true })
    .sort('displayOrder');
  ApiResponse.success(res, { subcategories }, 'Subcategories retrieved successfully');
});

export const createSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const slug = await generateUniqueSlug(req.body.name, Subcategory);
  const subcategory = await Subcategory.create({ ...req.body, slug });
  ApiResponse.created(res, { subcategory }, 'Subcategory created successfully');
});

export const updateSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const subcategory = await Subcategory.findById(req.params.id);
  if (!subcategory) throw ApiError.notFound('Subcategory not found');
  
  if (req.body.name && req.body.name !== subcategory.name) {
    req.body.slug = await generateUniqueSlug(req.body.name, Subcategory);
  }
  
  Object.assign(subcategory, req.body);
  await subcategory.save();
  ApiResponse.success(res, { subcategory }, 'Subcategory updated successfully');
});

export const deleteSubcategory = asyncHandler(async (req: Request, res: Response) => {
  const subcategory = await Subcategory.findById(req.params.id);
  if (!subcategory) throw ApiError.notFound('Subcategory not found');
  
  await subcategory.deleteOne();
  ApiResponse.success(res, null, 'Subcategory deleted successfully');
});
