import { Users } from "@prisma/client"
import { IUserRepository } from "../IUserRepository"
import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO"
import { randomUUID } from 'crypto'


export class InMemoryUsersRepository implements IUserRepository {
  async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public users: Users[] = []

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.users.find(user => user.id = id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: ICreateUsersDTO): Promise<Users> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      avatar: '',
      password: data.password || '',
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user)

    return user
  }

  async update(data: IUpdateAvatarDTO): Promise<void> {
    const findIndex = this.users.findIndex(user => user.id === data.user_id)
    this.users[findIndex].avatar = data.avatar
  }

  async list(): Promise<Users[]> {
    return this.users
  }
}