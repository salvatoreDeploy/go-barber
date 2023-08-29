import { ResetPasswordController } from "@modules/users/useCase/ResetPasswordUseCase/ResetPasswordController";
import { ForgotPasswordController } from "@modules/users/useCase/SendForgotPasswordEmailUseCase/SendForgotPasswordEmailController";
import { Router } from "express";

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

const passwordRoutes = Router();

passwordRoutes.post("/forgot", forgotPasswordController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };