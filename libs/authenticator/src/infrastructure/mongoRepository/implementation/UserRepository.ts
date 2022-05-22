import { injectable } from 'tsyringe';
import { BaseRepository } from './BaseRepository';
import { IUserRepository, User } from '../../../domain';
import { UserModel } from '../model';

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(){
    super(UserModel)
  }
}
