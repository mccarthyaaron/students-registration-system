import { UserInfo, UserModel } from './userSchema.ts';

export async function createUser(userInfo: UserInfo) {
  const user = await UserModel.create(userInfo);
  console.log(user);
}
