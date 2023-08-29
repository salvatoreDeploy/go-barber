import { Request, Response } from "express";
import { AuthenticatesessionsUseCase } from "./AuthenticateSessionsUseCase";
import { container } from "@shared/container";

class SessionsController {
  public async handle(request: Request, response: Response) {

    const { email, password } = request.body;

    const authenticateSessionsUseCase = container.resolve<AuthenticatesessionsUseCase>(AuthenticatesessionsUseCase)

    const { user, token } = await authenticateSessionsUseCase.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { SessionsController };
