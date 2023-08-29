import { CreateAppointmentsController } from "@modules/appointments/useCase/CreateAppointmentsUseCase/CreateAppointmentsController";
import { ListAppointmentsController } from "@modules/appointments/useCase/ListAppointmentsUseCase/ListAppointmentsController";
import { ensureAuthenticated } from "@modules/users/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";


const appointmentsRouter = Router();

// appointmentsRouter.use(ensureAuthenticated);

const createAppointmentsController = new CreateAppointmentsController();
const listAppointmentsController = new ListAppointmentsController();

appointmentsRouter.post(
  "/createappointments",
  createAppointmentsController.handle
);
appointmentsRouter.get("/listappointments", listAppointmentsController.handle);

export { appointmentsRouter };
