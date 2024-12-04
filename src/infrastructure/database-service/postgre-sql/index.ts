import { Inject, Injectable } from '@nestjs/common';

import DatabaseService from '@domain/core/abstractions/services/database-service';
import IUserRepository from '@domain/core/abstractions/services/database-service/repositories/user.abstract.repository';
import IIntakeRepository from '@domain/core/abstractions/services/database-service/repositories/intake.abstract.repository';

import UserRepository from './repositories/user.repository';
import IntakeRepository from './repositories/intake.repository';

@Injectable()
class PostgreSqlDatabaseService extends DatabaseService {
    user: IUserRepository;
    intake: IIntakeRepository;

    constructor(
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        @Inject(IntakeRepository) private readonly intakeRepository: IIntakeRepository,
    ) {
        super();
        this.user = userRepository;
        this.intake = intakeRepository;
    }
}

export default PostgreSqlDatabaseService;
