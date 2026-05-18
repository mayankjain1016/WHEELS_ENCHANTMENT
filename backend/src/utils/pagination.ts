import { Query } from 'mongoose';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  select?: string;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const paginate = async <T>(
  query: Query<T[], T>,
  options: PaginationOptions = {}
): Promise<PaginationResult<T>> => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10));
  const skip = (page - 1) * limit;

  // Apply sorting
  if (options.sort) {
    const sortFields = options.sort.split(',').join(' ');
    query = query.sort(sortFields);
  }

  // Apply field selection
  if (options.select) {
    const selectFields = options.select.split(',').join(' ');
    query = query.select(selectFields);
  }

  // Get total count
  const total = await query.model.countDocuments(query.getFilter());

  // Apply pagination
  const data = await query.skip(skip).limit(limit).exec();

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

export const getPaginationParams = (query: any): PaginationOptions => {
  return {
    page: query.page ? parseInt(query.page, 10) : 1,
    limit: query.limit ? parseInt(query.limit, 10) : 10,
    sort: query.sort || '-createdAt',
    select: query.select
  };
};
