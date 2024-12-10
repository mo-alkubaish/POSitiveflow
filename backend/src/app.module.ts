import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SettingsModule } from './settings/settings.module';

import config  from './mikro-orm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { FeedbackModule } from './feedback/feedback.module';
import { CatchAsyncMiddleware } from './middlewares/catch-async/catch-async.middleware';
import { APP_FILTER } from '@nestjs/core';
import { UniqueViolationExceptionFilter } from './exception-filters/unique-violation-exception.filter';


@Module({
  imports: [UsersModule, AuthModule, CommonModule, FeedbackModule, SuppliersModule, SettingsModule,
    ScheduleModule.forRoot(),
    MikroOrmModule.forRoot(config),
    ],
    
  controllers: [AppController],
  providers: [AppService],
  exports: [AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatchAsyncMiddleware)
      .forRoutes('*');
  }
}
