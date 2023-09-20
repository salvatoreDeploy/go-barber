import Handlebars from "handlebars";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvaider from "../models/IMailTemplateProvaider";

class HandlebarsMailTemplateProvider implements IMailTemplateProvaider {
  async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = Handlebars.compile(template)

    return parseTemplate(variables)
  }
}

export { HandlebarsMailTemplateProvider }