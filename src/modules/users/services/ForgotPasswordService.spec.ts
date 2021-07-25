import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ForgotPasswordService from './ForgotPasswordService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPasswordService: ForgotPasswordService;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    forgotPasswordService = new ForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send recover password email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    await forgotPasswordService.execute({ email: 'jhondoe@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to reject recover password of non existing user', async () => {
    await expect(
      forgotPasswordService.execute({
        email: 'jhondoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    await forgotPasswordService.execute({ email: 'jhondoe@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
