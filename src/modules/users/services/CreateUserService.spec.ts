import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it("shouldn't be able to create a new user with the same email", async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
