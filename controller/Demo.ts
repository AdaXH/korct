import { Autowired, GetMapping, param, PostMapping, request, ApiPrefix } from '@/common';
import { UserService } from '@/service/Userservice';
import { CommonObj } from '@/typings';

@ApiPrefix('/api')
export default class Test {
  @Autowired()
  private userService: UserService;

  /**
   * restful 获取userId
   * @param userId string
   */
  @GetMapping('/user/:userId')
  async queryUser(@param('userId') userId: string): Promise<CommonObj> {
    return this.userService.queryUserById(userId);
  }

  @PostMapping('/add-user')
  async insertUser(@request() user: CommonObj): Promise<CommonObj> {
    return this.userService.insertUser(user);
  }
}
