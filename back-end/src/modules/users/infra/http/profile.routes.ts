import { UpdateProfileController } from "@modules/users/useCase/UpdateProfileUserUseCase/UpdateProfileController";
import { ensureAuthenticated } from "@modules/users/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import { ShowProfileController } from "@modules/users/useCase/ShowProfileUseCase/ShowProfileController";


const profileRoutes = Router();

const updateProfileController = new UpdateProfileController()
const showProfileController = new ShowProfileController()

profileRoutes.use(ensureAuthenticated)

profileRoutes.put('/', updateProfileController.handle)
profileRoutes.get('/profile', showProfileController.handle)


export { profileRoutes };