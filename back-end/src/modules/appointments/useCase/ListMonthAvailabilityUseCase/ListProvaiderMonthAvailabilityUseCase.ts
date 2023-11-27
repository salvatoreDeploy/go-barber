import "reflect-metadata";
import { inject, injectable } from "inversify";
import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";
import { getDate, getDaysInMonth } from "date-fns";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvaiderMonthAvailabilitysUseCase {
  constructor(
    @inject("AppointmentsRepository")
    private appointemntsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsMonth =
      await this.appointemntsRepository.findAllInMonthFromProvaider({
        provider_id,
        month,
        year,
      });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDaysArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const vailability = eachDaysArray.map((day) => {
      const appointmentsInDay = appointmentsMonth.filter((appointment) => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    console.log(vailability);

    return vailability;
  }
}

export { ListProvaiderMonthAvailabilitysUseCase };
