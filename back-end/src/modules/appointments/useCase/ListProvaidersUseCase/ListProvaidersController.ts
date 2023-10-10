import { Request, Response } from "express";
import { container } from "@shared/container";
import { ListProvaidersUseCase } from "./ListProvaidersUseCase";

class ListProvaidersController {
  async handle(request: Request, response: Response) {

    const user_id = request.user.id

    const listProvaidersUsecase = container.resolve<ListProvaidersUseCase>(ListProvaidersUseCase)

    const result = await listProvaidersUsecase.execute({
      user_id
    });

    return response.status(201).json(result);
  }
}

export { ListProvaidersController };