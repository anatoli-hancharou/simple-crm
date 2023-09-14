import express from 'express';

class AuthRouter {
  constructor(authController) {
    this.authController = authController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/register').post(this.authController.register);
    router.route('/login').post(this.authController.login);
    return router;
  }
}

export default AuthRouter;