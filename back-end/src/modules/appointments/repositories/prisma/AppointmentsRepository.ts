import { Appointments, PrismaClient } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { IAppointmentsRepository } from "../IAppointmentsRepository";
import { injectable } from "inversify";

@injectable()
class AppointmentsRepository implements IAppointmentsRepository {

  private ormPrisma: PrismaClient

  constructor() {
    this.ormPrisma = prismaClient
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
}

export default AppointmentsRepository 
