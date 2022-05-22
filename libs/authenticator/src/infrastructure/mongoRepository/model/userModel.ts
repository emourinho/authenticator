import { User } from '../../../domain';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
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
