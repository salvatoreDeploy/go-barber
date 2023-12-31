import "reflect-metadata";
import { Appointments } from "@prisma/client";
import { IAppointmentsRepository } from "../IAppointmentsRepository";
import { randomUUID } from "node:crypto";
import { getDate, getMonth, getYear, isEqual } from "date-fns";
import { IFindAllInMonthFromProvaiderDTO } from "../dtos/IFindAllInMonthFromProvaiderDTO";
import { IFindAllInDayFromProvaiderDTO } from "../dtos/IFindAllInDayFromProvaiderDTO";

export class InMemoryAppointmentRepository implements IAppointmentsRepository {
  public appointments: Appointments[] = [];

  async findByDate(date: Date) {
    const appointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    if (!appointment) {
      return null;
    }

    return appointment;
  }
  async create(data: ICreateAppointmentsDTO): Promise<Appointments> {
    const appointment = {
      id: randomUUID(),
      provider_id: data.provider_id,
      user_id: data.user_id,
      date: data.date || new Date(),
      created_at: new Date(),
      updated_at: null || new Date(),
    };

    this.appointments.push(appointment);

    return appointment;
  }
  async list(): Promise<Appointments[]> {
    return this.appointments;
  }

  async findAllInMonthFromProvaider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProvaiderDTO): Promise<Appointments[]> {
    const appointmentsMonth = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointmentsMonth;
  }

  async findAllInDayFromProvaider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProvaiderDTO): Promise<Appointments[]> {
    const appointmentsMonth = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointmentsMonth;
  }
}
