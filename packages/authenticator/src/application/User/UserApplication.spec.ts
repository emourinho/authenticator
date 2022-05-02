import faker from '@faker-js/faker';
import {
  IUserRepository,
  UserProps,
  readByPageReturn,
  User,
} from '../../domain';
import { UserApplication } from './UserApplication';

class UserRepositorySpy implements IUserRepository {
  readOneById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  readByPage(filter: any): Promise<readByPageReturn<User>> {
    throw new Error('Method not implemented.');
  }
  readAll(filter: any): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updateById(id: string, model: any): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(filter: any, model: any): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async readOne(filter: any): Promise<User> {
    return null;
  }
  async create(model: User) {
    model._id = 'any id generated';
    return model;
  }
}

describe('UserApplication', () => {
  it('should create success Local', async () => {
    const USER_MOCK: UserProps = {
      email: faker.internet.email(),
      password: faker.internet.password(7),
      name: faker.name.findName(),
    };

    const sut = new UserApplication(new UserRepositorySpy());
    const newUser = await sut.createOrUpdate(USER_MOCK, 'local');

    expect(newUser._id).toBeDefined();
    expect(newUser.password).toBeUndefined();
    expect(newUser.email).toBe(USER_MOCK.email);
    expect(newUser.name).toBe(USER_MOCK.name);
  });

  it('should create error email required Local', async () => {
    const USER_MOCK: UserProps = {
      email: faker.internet.email(),
      password: faker.internet.password(7),
      name: faker.name.findName(),
    };

    const sut = new UserApplication(new UserRepositorySpy());
    await expect(
      sut.createOrUpdate({ ...USER_MOCK, email: undefined }, 'local')
    ).rejects.toThrowError();
  });

  it('should create error password 6 length', async () => {
    const USER_MOCK: UserProps = {
      email: faker.internet.email(),
      password: faker.internet.password(6),
      name: faker.name.findName(),
    };

    const sut = new UserApplication(new UserRepositorySpy());
    await expect(
      sut.createOrUpdate({ ...USER_MOCK, email: undefined }, 'local')
    ).rejects.toThrowError();
  });

  it('should create error password required Local', async () => {
    const USER_MOCK: UserProps = {
      email: faker.internet.email(),
      password: faker.internet.password(7),
      name: faker.name.findName(),
    };

    const sut = new UserApplication(new UserRepositorySpy());
    await expect(
      sut.createOrUpdate({ ...USER_MOCK, password: undefined }, 'local')
    ).rejects.toThrowError();
  });

  it('should create success Facebook', async () => {
    const USER_MOCK: UserProps = {
      email: faker.internet.email(),
      password: faker.internet.password(7),
      name: faker.name.findName(),
    };

    const sut = new UserApplication(new UserRepositorySpy());

    const newUser = await sut.createOrUpdate(USER_MOCK, 'facebook');

    expect(newUser._id).toBeDefined();
    expect(newUser.password).toBeUndefined();
    expect(newUser.email).toBe(USER_MOCK.email);
    expect(newUser.name).toBe(USER_MOCK.name);
  });
});
