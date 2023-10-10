import { CreateAppointmentsController } from "@modules/appointments/useCase/CreateAppointmentsUseCase/CreateAppointmentsController";
import { ListAppointmentsController } from "@modules/appointments/useCase/ListAppointmentsUseCase/ListAppointmentsController";
import { ListProvaidersController } from "@modules/appointments/useCase/ListProvaidersUseCase/ListProvaidersController";
import { ensureAuthenticated } from "@modules/users/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";


const provaidersRouter = Router();

const listProvaidersController = new ListProvaidersController()

provaidersRouter.use(ensureAuthenticated);

provaidersRouter.get('/', listProvaidersController.handle)



export { provaidersRouter };