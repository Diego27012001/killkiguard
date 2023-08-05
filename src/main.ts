import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // Usamos el puerto 3000 como valor predeterminado si no se encuentra en la configuración

  await app.listen(port);
  // Mantén una referencia al servidor HTTP
  const server = http.createServer();
}
bootstrap();
