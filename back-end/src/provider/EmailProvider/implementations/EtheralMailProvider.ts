import { IMailProvider } from "../models/IMailProvider"
import nodemailer, { Transporter } from 'nodemailer'



class EtherealMailProvider implements IMailProvider {

  private client: Transporter | null = null

  constructor() {

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

  async sendMail(to: string, body: string): Promise<void> {

    if (!this.client) {
      return
    }

    const message = await this.client.sendMail({
      from: 'Equipe ProjetosDeploy <liderhenrique@gmail.com>',
      to,
      subject: 'Recuperação de senha ✔',
      text: body,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }