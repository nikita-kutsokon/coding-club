import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import ApplicationModule from '@application/application.module';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix('api');

    ApplicationModule.setupSwagger(app);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(Number(process.env.APPLICATION_PORT || 3000));
}

bootstrap();
