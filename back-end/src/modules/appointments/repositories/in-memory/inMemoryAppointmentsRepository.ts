import 'reflect-metadata';
import { Appointments } from "@prisma/client";
import { IAppointmentsRepository } from "../IAppointmentsRepository";
import { randomUUID } from 'node:crypto'
import { isEqual } from 'date-fns';


export class InMemoryAppointmentRepository implements IAppointmentsRepository {

  public appointments: Appointments[] = []


  async findByDate(date: Date) {
    const appointment = this.appointments.find(appointment => isEqual(appointment.date, date))

    if (!appointment) {
      return null
    }

    return appointment
  }
  async create(data: ICreateAppointmentsDTO): Promise<Appointments> {

    const appointment = {
      id: randomUUID(),
      provider_id: data.provider_id,
      date: new Date(),
      created_at: new Date(),
      updated_at: null || new Date()
    }

    this.appointments.push(appointment)

    return appointment

  }
  async list(): Promise<Appointments[]> {
    return this.appointments
  }
}