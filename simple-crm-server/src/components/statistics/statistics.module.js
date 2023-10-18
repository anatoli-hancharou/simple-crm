import StatisticsController from './statistics.controller.js';
import StatisticsService from './statistics.service.js';
import StatisticsRouter from './statistics.router.js';

const statisticsService = new StatisticsService();
const statisticsController = new StatisticsController(statisticsService);
const statisticsRouter = new StatisticsRouter(statisticsController);

export default {
  service: statisticsService,
  controller: statisticsController,
  router: statisticsRouter.getRouter(),
};