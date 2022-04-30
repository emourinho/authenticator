import { inject, injectable } from 'tsyringe';
import { IUserRepository, UserProps, User } from '../../domain';
import { createTransport } from 'nodemailer';

@injectable()
export class UserApplication {
  constructor(
    @inject('UserRepository') private readonly _userRepository: IUserRepository
  ) {}

  async createOrUpdate(user: UserProps, provider: "facebook" | "local") {
    let _user = await this._userRepository.readOne({ email: user.email });
    if (_user) {
      if (user.avatar && !_user.avatar) {
        await this._userRepository.updateById(_user._id, {
          avatar: user.avatar,
        });
        _user.avatar = user.avatar;
      }
    } else {
      _user = new User(user);
      await _user.create(provider);
      _user = await this._userRepository.create(_user);
      const transporter = createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'everton.mourinho@hotmail.com',
          pass: 'veveto#123',
        },
        tls: { rejectUnauthorized: false },
      });

      transporter.sendMail(
        {
          from: 'contato@emoutech.com.br',
          to: _user.email,
          subject: 'Nova conta',
          html: `Bem vindo ${_user.name}!<br /> <p>Para ativar sua conta <a href="https://localhost:${process.env.PORT}/api/core/user/confirmation/${_user.status.hashConfirmation}">clique aqui</a></p>`,
        },
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email enviado: ' + info.response);
          }
        }
      );
    }

    _user.password = undefined;
    return _user;
  }

  async confirmRegister(hashConfirmation: number) {
    const user = await this._userRepository.readOne({
      'status.hashConfirmation': hashConfirmation,
    });
    if ((await user.status.code) == 'pending') {
      await this._userRepository.update(
        { 'status.hashConfirmation': hashConfirmation },
        {
          status: {
            code: 'confirmed',
            updateAt: new Date(),
          },
        }
      );
    }

    return user;
  }

  async findAll(filter: object) {
    return this._userRepository.readByPage(filter);
  }

  async findOneByEmail(email) {
    return await this._userRepository.readOne({ email }, '+password');
  }

  async findOneById(_id) {
    return await this._userRepository.readOneById(_id);
  }
}
