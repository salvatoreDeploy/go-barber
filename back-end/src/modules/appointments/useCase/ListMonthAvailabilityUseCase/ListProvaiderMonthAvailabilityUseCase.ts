import "reflect-metadata";
import { IUserRepository } from "@modules/users/reporitories/IUserRepository";
import { Users } from "@prisma/client";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "inversify";
import { IAppointmentsRepository } from "@modules/appointments/repositories/IAppointmentsRepository";

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

    return [{ day: 5, available: false }];
  }
}

export { ListProvaiderMonthAvailabilitysUseCase };
