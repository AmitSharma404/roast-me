/**
 * Custom error classes for better error handling
 */

/**
 * Base error class for API errors
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Validation error - 400 Bad Request
 */
export class ValidationError extends ApiError {
  constructor(message) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

/**
 * Not found error - 404 Not Found
 */
export class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * File error - 400 Bad Request
 */
export class FileError extends ApiError {
  constructor(message) {
    super(message, 400, 'FILE_ERROR');
    this.name = 'FileError';
  }
}

/**
 * External service error - 502 Bad Gateway
 */
export class ExternalServiceError extends ApiError {
  constructor(message, service) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
    this.service = service;
  }
}
