import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // Create Nest App
  const app = await NestFactory.create(AppModule);

  // GET CONFIG SERVICE
  const configService = app.get(ConfigService);

  // ERROR HANDLING
  app.useGlobalFilters(new GlobalExceptionFilter(configService));

  // CORS
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  });

  // PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // LISTEN PORT
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
