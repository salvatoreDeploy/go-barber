import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvaider from "../models/IMailTemplateProvaider";

class FakeMailTemplateProvider implements IMailTemplateProvaider {
  async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}

export { FakeMailTemplateProvider }