import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as log from 'electron-log';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  log.info("inside nest",process.env['mongo_uri'])
  app.setGlobalPrefix('api');

  // Serve index.html for unknown routes (Angular routing support)
  app.useStaticAssets(join(__dirname, '..', 'public', 'front-end','browser'));
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(join(__dirname, '..', 'public', 'front-end','browser', 'index.html'));
    } else {
      next();
    }
  });

  await app.listen(3000);
}
bootstrap();
