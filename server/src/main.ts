import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'https://desserts-topaz.vercel.app/'],
  });

  await app.listen(3000);
}
bootstrap();
