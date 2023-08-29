import { Appointments } from "@prisma/client"

export interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointments | null>
  create(data: ICreateAppointmentsDTO): Promise<Appointments>
  list(): Promise<Appointments[]>
}