import { Request, Response } from "express";
import { container } from "@shared/container";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";


class UpdateProfileController {
  public async handle(request: Request, response: Response) {
    const { name, email, old_password, password } = request.body;
    const user_id = request.user.id

    const updateProfileUseCase =
      container.resolve<UpdateProfileUseCase>(UpdateProfileUseCase);

    const result = await updateProfileUseCase.execute({
      user_id,
      name,
      email,
      oldPassword: old_password,
      password,
    });


    return response.status(201).json(result);
  }
}

export { UpdateProfileController };
