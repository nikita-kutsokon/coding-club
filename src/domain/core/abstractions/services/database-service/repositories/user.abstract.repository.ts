import User from '@domain/core/entities/user.entity';

interface IUserRepository {
    createRecord(data: User): Promise<User>;
    getRecordById(id: string): Promise<User | null>;
    getRecordByEmail(email: string): Promise<User | null>;
    updateRecordById(id: string, data: User): Promise<User | null>;
}

export default IUserRepository;
