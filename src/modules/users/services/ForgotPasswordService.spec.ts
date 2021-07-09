import 'reflect-metadata';
// import AppError from '@shared/error/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ForgotPasswordService from './ForgotPasswordService';

describe('ForgotPassword', () => {
  it('should be able to send recover password email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const forgotPassword = new ForgotPasswordService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    await forgotPassword.execute({ email: 'jhondoe@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });
});
