import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundError, UniqueConstraintViolationException } from '@mikro-orm/mongodb';

@Catch(NotFoundError)
export class NotFoundErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundErrorExceptionFilter.name);

  async catch(exception: UniqueConstraintViolationException, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      // Extract name of the entity from MongoDB error message and the id
      const errorMessage = exception.message;
      
      await response
        .status(HttpStatus.NOT_FOUND)
        .json({
          statusCode: HttpStatus.NOT_FOUND,
          message: errorMessage,
          error: 'Not Found',
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      this.logger.error(`Error handling Not Found: ${error.message}`);
      throw error;
    }
  }
}
