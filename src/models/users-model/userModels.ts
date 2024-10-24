import { type UserInfo, UserModel } from './userSchema';

export async function createUser(userInfo: UserInfo) {
  const user = await UserModel.create(userInfo);
  console.log(user);
}
