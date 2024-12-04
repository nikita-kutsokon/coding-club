import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerModule {
    static setupSwagger(app: INestApplication): void {
        const config = new DocumentBuilder().setTitle('StudyHub API Documentation').setDescription('API description').setVersion('1.0').build();

        const document = NestSwaggerModule.createDocument(app, config);
        NestSwaggerModule.setup('api/docs', app, document);
    }
}
