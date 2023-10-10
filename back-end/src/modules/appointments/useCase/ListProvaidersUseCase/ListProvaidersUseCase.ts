import "reflect-metadata";
import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { Users } from "@prisma/client";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "inversify";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvaidersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute({
    user_id
  }: IRequest): Promise<Users[]> {
    const users = await this.usersRepository.findAllProvaiders({ execept_user_id: user_id })
    if (!users) {
      throw new AppError('User not found.');
    }

    return users;
  }
}

export { ListProvaidersUseCase }