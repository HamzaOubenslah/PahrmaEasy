/**
 * Standardized API response format
 */
export default class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {any} data - Response data
   * @param {string} message - Human-readable message
   */
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Send the formatted response
   * @param {import('express').Response} res - Express response object
   * @returns {import('express').Response}
   */
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      code: this.statusCode,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp
    });
  }
}

/**
 * Helper function for quick success responses
 * @param {import('express').Response} res 
 * @param {any} data 
 * @param {string} message 
 * @param {number} statusCode 
 */
export const successResponse = (res, data, message = "Operation successful", statusCode = 200) => {
  new ApiResponse(statusCode, data, message).send(res);
};

/**
 * Helper function for error responses (uses ApiError)
 * @param {import('express').Response} res 
 * @param {import('./apiError').default} error 
 */
export const errorResponse = (res, error) => {
  new ApiResponse(
    error.statusCode || 500,
    null,
    error.message || "Internal server error"
  ).send(res);
};