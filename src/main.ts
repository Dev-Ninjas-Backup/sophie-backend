import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sophie API')
    .setDescription('The Sophie API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.enableCors({
    origin: [
      'https://olimpass.io',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://sophie-six.vercel.app',
      'https://www.olimpass.io',
      'https://olimpass.io',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(
    '/webhook',
    bodyParser.raw({ type: 'application/json', limit: '10mb' }),
  );
  app.use(bodyParser.json());

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT);
  console.log(`🚀 Server is running on: http://localhost:${PORT}`);
}
bootstrap();

// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';

// export async function createApp() {
//   const server = express();

//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(server),
//   );

//   app.enableCors({
//     origin: [
//       'http://localhost:3000',
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'http://localhost:5175',
//     ],
//     credentials: true,
//   });

//   app.use(cookieParser());

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true,
//     }),
//   );

//   app.use(
//     '/webhook',
//     bodyParser.raw({ type: 'application/json' }),
//   );

//   app.setGlobalPrefix("api");
//   await app.init();
//   return server;
// }
