import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import ApplicationModule from '@application/application.module';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    ApplicationModule.setupSwagger(app);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            strategy: 'excludeAll',
            excludeExtraneousValues: true,
        }),
    );

    await app.listen(Number(process.env.APPLICATION_PORT || 3000));
}

bootstrap();
