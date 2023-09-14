import AuthController from './auth.controller.js';
import AuthService from './auth.service.js';
import AuthRouter from './auth.router.js';

const authService = new AuthService();
const authController = new AuthController(authService);
const authRouter = new AuthRouter(authController);

export default {
  service: authService,
  controller: authController,
  router: authRouter.getRouter(),
};