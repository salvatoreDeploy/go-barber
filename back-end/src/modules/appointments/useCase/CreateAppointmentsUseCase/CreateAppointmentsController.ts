import { Request, Response } from "express";
import { parseISO } from "date-fns";
import CreateAppointmentsUseCase from "./CreateAppointmentsUseCase";
import AppointmentsRepository from "@modules/appointments/repositories/prisma/AppointmentsRepository";
import { container } from "@shared/container";


class CreateAppointmentsController {
  async handle(request: Request, response: Response) {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentsUsecase = container.resolve<CreateAppointmentsUseCase>(CreateAppointmentsUseCase)

    const result = await createAppointmentsUsecase.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(result);
  }
}

export { CreateAppointmentsController };
