import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const authenticationsRouter = Router();

authenticationsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default authenticationsRouter;
