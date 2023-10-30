import { Appointments, PrismaClient } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { IAppointmentsRepository } from "../IAppointmentsRepository";
import { injectable } from "inversify";
import { IFindAllInMonthFromProvaiderDTO } from "../dtos/IFindAllInMonthFromProvaiderDTO";
import { raw } from "@prisma/client/runtime";

@injectable()
class AppointmentsRepository implements IAppointmentsRepository {
  private ormPrisma: PrismaClient;

  constructor() {
    this.ormPrisma = prismaClient;
  }

  public async findByDate(date: Date): Promise<Appointments | null> {
    const findAppointment = await this.ormPrisma.appointments.findFirst({
      where: {
        date,
      },
    });

    return findAppointment || null;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appointment = await this.ormPrisma.appointments.create({
      data: {
        provider_id,
        date,
      },
    });
    return appointment;
  }

  public async list(): Promise<Appointments[]> {
    const appointments = await this.ormPrisma.appointments.findMany();

    return appointments;
  }

  public async findAllInMonthFromProvaider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProvaiderDTO): Promise<Appointments[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const appointmentMonth: Appointments[] = await this.ormPrisma.$queryRaw`
      SELECT *
      FROM appointments
      WHERE to_char(date, 'MM-YYYY') = '${parsedMonth}-${year}'
      AND provider_id = ${provider_id};
    `;

    return appointmentMonth;
  }
}

export default AppointmentsRepository;
