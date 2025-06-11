import winston from 'winston';
import { DateTime } from 'luxon';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom timestamp format
const customTimestamp = winston.format((info) => {
  info.timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss.SSS');
  return info;
});

// Log format for console
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (stack) log += `\n${stack}`;
  return log;
});

// Log format for files (JSON)
const fileFormat = winston.format.json();

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    customTimestamp(),
    errors({ stack: true }), // Include error stacks
    winston.format.splat() // String interpolation
  ),
  transports: [
    // Console transport (colored, human-readable)
    new winston.transports.Console({
      format: combine(
        colorize(),
        consoleFormat
      )
    }),
    // Error log file (JSON)
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat
    }),
    // Combined log file (JSON)
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileFormat
    })
  ],
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]
});

// Stream for morgan HTTP logging
export const httpLogStream = {
  write: (message) => logger.info(message.trim())
};

export default logger;