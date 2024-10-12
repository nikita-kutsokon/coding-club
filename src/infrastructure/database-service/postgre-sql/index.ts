import { Inject, Injectable } from '@nestjs/common';

import DatabaseService from '@domain/core/abstractions/services/database-service';
import IUserRepository from '@domain/core/abstractions/services/database-service/repositories/user.abstract.repository';

import UserRepository from './repositories/user.repository';

@Injectable()
class PostgreSqlDatabaseService extends DatabaseService {
    user: IUserRepository;

    constructor(@Inject(UserRepository) private readonly userRepository: IUserRepository) {
        super();
        this.user = userRepository;
    }
}

export default PostgreSqlDatabaseService;
