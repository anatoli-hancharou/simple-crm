import express from 'express';

class CustomerRouter {
  constructor(customerController) {
    this.customerController = customerController;
  }

  getRouter() {
    const router = express.Router();
    // router.route('/:id').get(this.userController.getUser);
    router.route('/').get(this.customerController.getAllCustomers);
    router.route('/').post(this.customerController.createCustomer);
    return router;
  }
}

export default CustomerRouter;