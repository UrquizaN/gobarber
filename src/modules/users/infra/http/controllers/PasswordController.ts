import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class PasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPassword = container.resolve(ForgotPasswordService);

    await forgotPassword.execute({
      email,
    });

    return response.status(204);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const forgotPassword = container.resolve(ResetPasswordService);

    await forgotPassword.execute({
      password,
      token,
    });

    return response.status(204);
  }
}
