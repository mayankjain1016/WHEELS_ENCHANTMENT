import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import Product from '../models/Product';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import imageProcessor from '../services/image.service';
import { paginate, getPaginationParams } from '../utils/pagination';
import { generateUniqueSlug } from '../utils/slugify';

/**
 * @route   GET /api/v1/products
 * @desc    Get all products with filters
 * @access  Public
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, sort } = getPaginationParams(req.query);
  const { categoryId, subcategoryId, isActive, isFeatured, isBestseller, search, minPrice, maxPrice } = req.query;

  // Build filter
  const filter: any = {};
  
  if (categoryId) filter.categoryId = categoryId;
  if (subcategoryId) filter.subcategoryId = subcategoryId;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  if (isBestseller !== undefined) filter.isBestseller = isBestseller === 'true';
  
  if (search) {
    filter.$text = { $search: search as string };
  }
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
  }

  // Query with pagination
  const query = Product.find(filter)
    .populate('categoryId', 'name slug')
    .populate('subcategoryId', 'name slug');
    
  const result = await paginate(query, { page, limit, sort });

  ApiResponse.paginated(
    res,
    result.data,
    result.pagination.page,
    result.pagination.limit,
    result.pagination.total,
    'Products retrieved successfully'
  );
});

/**
 * @route   GET /api/v1/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
    .populate('categoryId', 'name slug')
    .populate('subcategoryId', 'name slug');

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  ApiResponse.success(res, { product }, 'Product retrieved successfully');
});

/**
 * @route   GET /api/v1/products/slug/:slug
 * @desc    Get product by slug
 * @access  Public
 */
export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('categoryId', 'name slug')
    .populate('subcategoryId', 'name slug');

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  ApiResponse.success(res, { product }, 'Product retrieved successfully');
});

/**
 * @route   POST /api/v1/products
 * @desc    Create new product
 * @access  Private (Admin)
 */
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  // Verify category exists
  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    throw ApiError.notFound('Category not found');
  }

  // Verify subcategory if provided
  if (req.body.subcategoryId) {
    const subcategory = await Subcategory.findById(req.body.subcategoryId);
    if (!subcategory) {
      throw ApiError.notFound('Subcategory not found');
    }
  }

  // Generate unique slug
  const slug = await generateUniqueSlug(req.body.name, Product);

  // Handle images if uploaded
  const files = req.files as Express.Multer.File[];
  let images: any[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const validation = imageProcessor.validateImage(file);
      if (!validation.valid) {
        throw ApiError.badRequest(validation.error!);
      }

      const processedImage = await imageProcessor.processImage(file.buffer, 'products');
      images.push({
        url: processedImage.optimized.url,
        thumbnail: processedImage.thumbnail.url,
        alt: req.body.name || '',
        filename: processedImage.filename
      });
    }
  }

  // Create product
  const product = await Product.create({
    ...req.body,
    slug,
    images
  });

  await product.populate('categoryId subcategoryId');

  ApiResponse.created(res, { product }, 'Product created successfully');
});

/**
 * @route   PUT /api/v1/products/:id
 * @desc    Update product
 * @access  Private (Admin)
 */
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  // Verify category if changed
  if (req.body.categoryId && req.body.categoryId !== product.categoryId.toString()) {
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      throw ApiError.notFound('Category not found');
    }
  }

  // Verify subcategory if changed
  if (req.body.subcategoryId) {
    const subcategory = await Subcategory.findById(req.body.subcategoryId);
    if (!subcategory) {
      throw ApiError.notFound('Subcategory not found');
    }
  }

  // Update slug if name changed
  if (req.body.name && req.body.name !== product.name) {
    req.body.slug = await generateUniqueSlug(req.body.name, Product);
  }

  // Update product
  Object.assign(product, req.body);
  await product.save();
  await product.populate('categoryId subcategoryId');

  ApiResponse.success(res, { product }, 'Product updated successfully');
});

/**
 * @route   POST /api/v1/products/:id/images
 * @desc    Add images to product
 * @access  Private (Admin)
 */
export const addProductImages = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw ApiError.badRequest('No images provided');
  }

  const newImages: any[] = [];

  for (const file of files) {
    const validation = imageProcessor.validateImage(file);
    if (!validation.valid) {
      throw ApiError.badRequest(validation.error!);
    }

    const processedImage = await imageProcessor.processImage(file.buffer, 'products');
    newImages.push({
      url: processedImage.optimized.url,
      thumbnail: processedImage.thumbnail.url,
      alt: product.name,
      filename: processedImage.filename
    });
  }

  product.images.push(...newImages);
  await product.save();

  ApiResponse.success(res, { product }, 'Images added successfully');
});

/**
 * @route   DELETE /api/v1/products/:id/images/:filename
 * @desc    Delete product image
 * @access  Private (Admin)
 */
export const deleteProductImage = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  const imageIndex = product.images.findIndex(img => img.filename === req.params.filename);

  if (imageIndex === -1) {
    throw ApiError.notFound('Image not found');
  }

  // Delete image file
  await imageProcessor.deleteImage(req.params.filename, 'products');

  // Remove from array
  product.images.splice(imageIndex, 1);
  await product.save();

  ApiResponse.success(res, { product }, 'Image deleted successfully');
});

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Delete product
 * @access  Private (Admin)
 */
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  // Delete all images
  for (const image of product.images) {
    if (image.filename) {
      await imageProcessor.deleteImage(image.filename, 'products');
    }
  }

  await product.deleteOne();

  ApiResponse.success(res, null, 'Product deleted successfully');
});

/**
 * @route   PATCH /api/v1/products/:id/stock
 * @desc    Update product stock
 * @access  Private (Admin)
 */
export const updateProductStock = asyncHandler(async (req: Request, res: Response) => {
  const { stock } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { stock },
    { new: true, runValidators: true }
  );

  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  ApiResponse.success(res, { product }, 'Stock updated successfully');
});
