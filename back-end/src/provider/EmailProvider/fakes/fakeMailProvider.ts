import { IMailProvider } from "../models/IMailProvider";

interface IMessage {
  to: string
  body: string
}

class FakeMailProvider implements IMailProvider {
  private messeages: IMessage[] = []

  async sendMail(to: string, body: string): Promise<void> {
    this.messeages.push({
      to, body
    })
  }

}

export { FakeMailProvider };