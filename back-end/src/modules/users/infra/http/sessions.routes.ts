import { SessionsController } from "@modules/users/useCase/SessionsUsecase/SessionsController";
import { Router } from "express";


const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.handle);

export { sessionsRoutes };
