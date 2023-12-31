import authModule from '../components/auth/auth.module.js';
import customerModule from '../components/customer/customer.module.js';
import statisticsModule from '../components/statistics/statistics.module.js';
import auth from '../middlewares/auth.js';

export default (app) => {
  app.use('/customers', auth, customerModule.router);
  app.use('/auth', authModule.router);
  app.use('/statistics', auth, statisticsModule.router);
};