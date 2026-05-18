import { Response } from 'express';

interface ApiResponseData {
  success: boolean;
  message?: string;
  data?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

class ApiResponse {
  static success(
    res: Response,
    data: any = null,
    message: string = 'Success',
    statusCode: number = 200,
    meta?: ApiResponseData['meta']
  ): Response {
    const response: ApiResponseData = {
      success: true,
      message,
      data
    };

    if (meta) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  static created(
    res: Response,
    data: any = null,
    message: string = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static paginated(
    res: Response,
    data: any[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Success'
  ): Response {
    const totalPages = Math.ceil(total / limit);

    return this.success(res, data, message, 200, {
      page,
      limit,
      total,
      totalPages
    });
  }
}

export default ApiResponse;
