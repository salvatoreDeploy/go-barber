import { Request, Response } from "express";
import { UpdateAvatarUserUseCase } from "./UpdateAvatarUserUseCase";
import { container } from "@shared/container";

class UpdateAvatarUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;
    const avatarFileName = request.file?.filename

    const updateAvatarUser = container.resolve<UpdateAvatarUserUseCase>(UpdateAvatarUserUseCase);

    const result = await updateAvatarUser.execute({
      user_id: id,
      avatarFileName: avatarFileName,
    });

    return response.status(200).json(result);
  }
}

export { UpdateAvatarUserController };
