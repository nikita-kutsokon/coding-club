import { Module } from '@nestjs/common';

import AuthenticationUseCases from '@domain/use-cases/authentication.use-cases';

import { PostgreSqlDatabaseModule } from '@infrastructure/database-service';
import { PassportJsAuthenticationModule } from '@infrastructure/authentication-service';
import { TypedConfigJsService, TypedConfigJsServiceModule } from '@infrastructure/configurations-service';

import AuthenticationController from './controllers/authentication.controller';

@Module({
    imports: [PostgreSqlDatabaseModule, PassportJsAuthenticationModule, TypedConfigJsServiceModule],
    providers: [TypedConfigJsService, AuthenticationUseCases],
    controllers: [AuthenticationController],
})
class ApplicationModule {}

export default ApplicationModule;
