import { CommonObj } from '@/typings';
import { UserServiceImpl } from './UserServiceImpl';

export class UserService implements UserServiceImpl {
  public async queryUserById(userId: string): Promise<CommonObj> {
    // query user from db ====>
    const user = { name: 'hello', userId };
    return user;
  }

  public async insertUser(user: CommonObj): Promise<CommonObj> {
    // insert user into db =====>
    return user;
  }
}
