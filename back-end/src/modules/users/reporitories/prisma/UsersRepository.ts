import { PrismaClient, Users } from "@prisma/client";
import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import prismaClient from "@shared/infra/prisma";
import { IUserRepository } from "../IUserRepository";
import { injectable } from "inversify";

@injectable()
class UsersRepository implements IUserRepository {

  private ormPrisma: PrismaClient

  constructor() {
    this.ormPrisma = prismaClient
  }

  public async save(user: Users): Promise<Users> {
    throw new Error("Method not implemented.");
  }

  public async findByEmail(email: string) {
    const findEmailExists = await this.ormPrisma.users.findFirst({
      where: {
        email,
      },
    })

    return findEmailExists || null;
  }

  public async findById(id: string): Promise<Users | null> {
    const findEmailExists = await this.ormPrisma.users.findFirst({
      where: {
        id,
      },
    });

    return findEmailExists;
  }

  public async create({ name, email, password }: ICreateUsersDTO) {
    const user = await this.ormPrisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async update({ user_id, avatar }: IUpdateAvatarDTO) {
    const user = await this.ormPrisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        avatar,
      },
    });
  }

  public async list(): Promise<Users[]> {
    const users = await prismaClient.users.findMany();

    return users;
  }
}

export { UsersRepository };
