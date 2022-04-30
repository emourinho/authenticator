import { sign } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';


export class UserProps {
  _id?: string;
  name: string;
  email: string;
  password: string;
  status?: {
    updateAt: Date;
    hashConfirmation?: number;
    code: 'pending' | 'confirmed' | 'expired';
  };
  avatar?: string;
  createdAt?: Date
}

export class User extends UserProps {
  constructor(user: UserProps) {
    super()
    Object.assign(this, user)
  }

  async create(provider: "facebook" | "local") {
    if (!this.email) {
      throw new Error('Email is required');
    }

    switch (provider) {
      case "facebook":
        this.status = {
          code: 'confirmed',
          updateAt: new Date(),
        };
        this.createdAt = new Date()
        break;
      case "local":
        if (!this.password) {
          throw new Error('Password is required');
        }
        if (this.password.length < 6) {
          throw new Error('Length password invalid');
        }
        this.password = hashSync(this.password, 8);

        this.status = {
          code: 'pending',
          hashConfirmation: new Date().getTime(),
          updateAt: new Date(),
        };
        this.createdAt = new Date()
        break;
    }
  }

  generateToken(expiresIn = "20h") {
    if (!this._id) {
      throw new Error('Id is undefined');
    }
    return sign({ _id: this._id }, process.env.NX_JWT_SECRET, { expiresIn })
  }

  verifyPassword(pass) {
    return compareSync(pass, this.password);
  }
}
