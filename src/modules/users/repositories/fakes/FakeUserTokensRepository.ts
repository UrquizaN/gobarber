import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/error/AppError';

import { uuid } from 'uuidv4';
import UserTokens from '../../infra/typeorm/entities/UserTokens';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, {
      user_id,
      id: uuid(),
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userTokens);

    return userTokens;
  }

  public async findByToken(token: string): Promise<UserTokens> {
    const userTokens = this.userTokens.find(
      findToken => findToken.token === token,
    );

    if (!userTokens) {
      throw new AppError('Token does not exists');
    }

    return userTokens;
  }
}

export default FakeUserTokensRepository;
