import { IMailProvider } from "../models/IMailProvider"
import nodemailer, { Transporter } from 'nodemailer'



class EtherealMailProvider implements IMailProvider {

  private client: Transporter

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
    this.client.sendMail({
      from: 'Sender Name <sender@example.com>',
      to: 'Recipient <recipient@example.com>',
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html: '<p><b>Hello</b> to myself!</p>'
    })
  }
}

export { EtherealMailProvider }