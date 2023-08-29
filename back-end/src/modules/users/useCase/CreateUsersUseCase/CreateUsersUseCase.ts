import "reflect-metadata";
import { AppError } from "@shared/error/AppError";
import { ICreateUsersDTO } from "@modules/users/reporitories/dtos/ICreateUsersDTO";
import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { inject, injectable } from "inversify";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("HashProvider")
    private hashedProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: ICreateUsersDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already existing with this email.");
    }

    const hashedPassword = await this.hashedProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUsersUseCase };
