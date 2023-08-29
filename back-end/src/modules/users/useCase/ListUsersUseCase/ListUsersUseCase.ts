import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { Users } from "@prisma/client";


class ListUsersUseCase {

  constructor(private usersRepository: IUserRepository) { }

  async execute(): Promise<Users[]> {

    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
