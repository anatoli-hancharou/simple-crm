import customerModule from '../components/customer/customer.module.js';
import userModule from '../components/user/user.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/customers', customerModule.router);
};