import "reflect-metadata";
import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { inject, injectable } from "inversify";
import { ISendForgotPasswordDTO } from "@modules/users/reporitories/dtos/ISendForgotPasswordDTO";
import { IMailProvider } from "@provider/EmailProvider/models/IMailProvider";
import { AppError } from "@shared/error/AppError";
import { IUserTokenRepository } from "@modules/users/reporitories/IUserTokenRepository";

@injectable()
class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async execute({ email }: ISendForgotPasswordDTO): Promise<void> {

    const checkEmailExists = await this.usersRepository.findByEmail(email)

    if (!checkEmailExists) {
      throw new AppError('E-mail does not exists')
    }

    const { token } = await this.userTokenRepository.generate(checkEmailExists.id)

    await this.mailProvider.sendMail(email, `Pedido de Recuperação de senha Recebido: ${token}`)
  }
}

export { SendForgotPasswordEmailUseCase };
