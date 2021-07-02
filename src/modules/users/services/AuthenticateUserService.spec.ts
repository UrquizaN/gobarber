import 'reflect-metadata';
// import AppError from '@shared/error/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUserRepository);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
