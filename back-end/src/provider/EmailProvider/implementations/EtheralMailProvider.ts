import IMailTemplateProvaider from "@provider/MailTemplateProvider/models/IMailTemplateProvaider"
import ISendMailDTO from "../dtos/ISendMailDTO"
import { IMailProvider } from "../models/IMailProvider"
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from "inversify"


@injectable()
class EtherealMailProvider implements IMailProvider {

  private client: Transporter | null = null

  constructor(@inject('HandlebarsMailTemplateProvider') private mailTemplateProvider: IMailTemplateProvaider) {

    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })

  }

  async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {

    if (!this.client) {
      return
    }

    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Projetos Deploy",
        address: from?.email || "projetosDeploy@gmail.com"
      },
      to: {
        name: to.name, address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }