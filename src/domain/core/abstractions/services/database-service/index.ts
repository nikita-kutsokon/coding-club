import IUserRepository from './repositories/user.abstract.repository';

abstract class DatabaseService {
    abstract user: IUserRepository;
}

export default DatabaseService;
