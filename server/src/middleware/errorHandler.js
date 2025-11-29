/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err.message);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds the maximum allowed limit'
    });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Handle validation errors
  if (err.message.includes('Invalid') || err.message.includes('required')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Handle not found errors
  if (err.message.includes('not found')) {
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }

  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: 'Not allowed by CORS policy'
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message
  });
};
