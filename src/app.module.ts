import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'public/front-end/browser/'),
      exclude: ['/api/'], // Exclude API routes from static file serving
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
