export default interface IForgotPasswordProvider {
  sendMail(to: string, body: string): Promise<void>;
}
