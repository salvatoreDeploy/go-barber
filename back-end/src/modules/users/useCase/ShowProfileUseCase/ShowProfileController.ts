import { Request, Response } from "express";
import { container } from "@shared/container";
import { ShowProfileUseCase } from "./ShowProfileUseCase";


class ShowProfileController {
  public async handle(request: Request, response: Response) {
    const user_id = request.user.id

    const showProfileUseCase =
      container.resolve<ShowProfileUseCase>(ShowProfileUseCase);

    const result = await showProfileUseCase.execute({
      user_id,
    });


    return response.status(200).json(result);
  }
}

export { ShowProfileController };