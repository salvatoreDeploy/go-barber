import "reflect-metadata";
import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { inject, injectable } from "inversify";
import { ISendForgotPasswordDTO } from "@modules/users/reporitories/dtos/ISendForgotPasswordDTO";
import { IMailProvider } from "@provider/EmailProvider/models/IMailProvider";
import { AppError } from "@shared/error/AppError";
import { IUserTokenRepository } from "@modules/users/reporitories/IUserTokenRepository";
import path from 'node:path'

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

    const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'templates', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: checkEmailExists.name,
        email: checkEmailExists.email
      },
      subject: '[GoBaber] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkEmailExists.name,
          link: `http:\\localhost:3000/reset?token=${token}`
        }
      }
    })
  }
}

export { SendForgotPasswordEmailUseCase };
