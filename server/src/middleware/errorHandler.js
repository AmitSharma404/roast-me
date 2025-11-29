import { ApiError } from '../utils/errors.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err.message);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds the maximum allowed limit',
      code: 'FILE_SIZE_LIMIT'
    });
  }

  // Handle multer file type errors
  if (err.code === 'LIMIT_UNEXPECTED_FILE' || err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      error: err.message || 'File upload error',
      code: 'FILE_UPLOAD_ERROR'
    });
  }

  // Handle custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code
    });
  }

  // Handle CORS errors
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: 'Not allowed by CORS policy',
      code: 'CORS_ERROR'
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    code: 'INTERNAL_ERROR'
  });
};
