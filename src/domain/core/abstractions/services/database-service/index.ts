import IUserRepository from './repositories/user.abstract.repository';
import IIntakeRepository from './repositories/intake.abstract.repository';

abstract class DatabaseService {
    abstract user: IUserRepository;
    abstract intake: IIntakeRepository;
}

export default DatabaseService;
