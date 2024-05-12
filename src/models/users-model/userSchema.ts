import mongoose from 'mongoose';

export interface UserInfo {
  userName: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserInfo>({
  userName: { type: String, required: [true, 'User Schema: A user name is required'] },
  password: { type: String, required: [true, 'User Schema: A password for the user is required'] },
});

export const UserModel = mongoose.model('User', userSchema);
