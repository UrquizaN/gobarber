import IForgotPasswordProvider from '../models/IMailProvider';

interface Message {
  to: string;
  body: string;
}

class FakeForgotPasswordProvider implements IForgotPasswordProvider {
  private messages: Message[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}

export default FakeForgotPasswordProvider;
