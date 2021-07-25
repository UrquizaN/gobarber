import AppError from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import { addHours, isAfter } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokens: IUserTokensRepository,

    @inject('UserTokensRepository')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokens.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exist');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tokenCreated = userToken.created_at;
    const compareDate = addHours(tokenCreated, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token has expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    this.userRepository.save(user);
  }
}

export default ResetPasswordService;
