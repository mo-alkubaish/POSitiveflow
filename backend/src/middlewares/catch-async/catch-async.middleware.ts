import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CatchAsyncMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(next())
      .catch(error => {
        if (error instanceof HttpException) {
          next(error);
          
        } else {
          next(new HttpException('Internal Server Error', 500));
        }
      });
  }
}
