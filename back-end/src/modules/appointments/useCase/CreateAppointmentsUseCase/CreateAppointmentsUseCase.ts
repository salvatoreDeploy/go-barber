import "reflect-metadata"
import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { AppError } from "@shared/error/AppError";
import { startOfHour } from "date-fns";
import { inject, injectable } from "inversify";

@injectable()
class CreateAppointmentsUseCase {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository) { }

  async execute({ provider_id, date }: ICreateAppointmentsDTO) {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsUseCase;
