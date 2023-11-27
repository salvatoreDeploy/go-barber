import { Appointments } from "@prisma/client";
import { IFindAllInMonthFromProvaiderDTO } from "./dtos/IFindAllInMonthFromProvaiderDTO";
import { IFindAllInDayFromProvaiderDTO } from "./dtos/IFindAllInDayFromProvaiderDTO";

export interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointments | null>;
  create(data: ICreateAppointmentsDTO): Promise<Appointments>;
  list(): Promise<Appointments[]>;
  findAllInMonthFromProvaider(
    data: IFindAllInMonthFromProvaiderDTO
  ): Promise<Appointments[]>;
  findAllInDayFromProvaider(
    data: IFindAllInDayFromProvaiderDTO
  ): Promise<Appointments[]>;
}
