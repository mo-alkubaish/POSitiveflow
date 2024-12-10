import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintViolationException } from '@mikro-orm/mongodb';

@Catch(UniqueConstraintViolationException)
export class UniqueViolationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UniqueViolationExceptionFilter.name);

  async catch(exception: UniqueConstraintViolationException, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      // Extract field name from MongoDB error message
      const errorMessage = exception.message;
      const match = errorMessage.match(/index: (\w+)_1/);
      const field = match ? match[1] : 'field';

      await response
        .status(HttpStatus.CONFLICT)
        .json({
          statusCode: HttpStatus.CONFLICT,
          message: `A record with this ${field} already exists`,
          error: 'Conflict',
          field: field,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      this.logger.error(`Error handling unique violation: ${error.message}`);
      throw error;
    }
  }
}
