import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Mengaktifkan validasi otomatis untuk seluruh DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Otomatis membuang property/field asing yang tidak ada di DTO
      forbidNonWhitelisted: true, // Lempar error jika client mengirim field tak dikenal
      transform: true, // Otomatis mengubah tipe data (misal string angka ke tipe number)
    }),
  );

  // konfigurasi Cors
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
