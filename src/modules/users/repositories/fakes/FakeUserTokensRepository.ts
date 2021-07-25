import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

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
    });

    this.userTokens.push(userTokens);

    return userTokens;
  }
}

export default FakeUserTokensRepository;
