import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SanitizationPipe } from './common/sanitization-pipe/sanitization-pipe.pipe';
import { UniqueViolationExceptionFilter } from './exception-filters/unique-violation-exception.filter';
import { NotFoundErrorExceptionFilter } from './exception-filters/not-found-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalPipes(new SanitizationPipe());
  app.useGlobalFilters(new UniqueViolationExceptionFilter());
  app.useGlobalFilters( new NotFoundErrorExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('POSitiveFlow')
    .setDescription('Point of Sale API')
    .setVersion('1.0')
    .addServer('/api') // Add prefix only for Swagger
    .addServer('/')
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Enter JWT token",
        in: "header",
      },
      "Bearer",
    )
    .addSecurityRequirements("Bearer")  // Security requirement for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
