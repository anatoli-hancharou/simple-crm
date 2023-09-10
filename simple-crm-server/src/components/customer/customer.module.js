import CustomerController from './customer.controller.js';
import CustomerService from './customer.service.js';
import CustomerRouter from './customer.router.js';

const customerService = new CustomerService();
const customerController = new CustomerController(customerService);
const customerRouter = new CustomerRouter(customerController);

export default {
  service: customerService,
  controller: customerController,
  router: customerRouter.getRouter(),
};