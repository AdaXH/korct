import request from '../../util/request';

export async function queryUser(userId: string) {
  return request(`/api/user/${userId}`);
}
