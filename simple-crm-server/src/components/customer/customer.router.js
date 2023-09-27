import express from 'express';

class CustomerRouter {
  constructor(customerController) {
    this.customerController = customerController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/').get(this.customerController.getAllCustomers);
    router.route('/').post(this.customerController.createCustomer);
    router.route('/:id').put(this.customerController.updateCustomer);
    return router;
  }
}

export default CustomerRouter;