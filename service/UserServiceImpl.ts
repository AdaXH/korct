import { CommonObj } from '@/typings';

export interface UserServiceImpl {
  queryUserById: (userId: string) => Promise<CommonObj>;
  insertUser: (user: CommonObj) => Promise<CommonObj>;
}
