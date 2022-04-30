import { User } from '../../../domain';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: Object,
  avatar: String,
  password: {
    type: String,
    select: false,
    minlength: 6,
  },
});

UserSchema.loadClass(User)
const UserModel = model('User', UserSchema);
export { UserModel };
