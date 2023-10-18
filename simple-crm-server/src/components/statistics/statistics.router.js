import express from 'express';

class StatisticsRouter {
  constructor(statisticsController) {
    this.statisticsController = statisticsController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/get-status-distribution').get(this.statisticsController.getStatusDistributionOverTimeRange);
    //router.route('/:id').put(this.statisticsController.updateCustomer);
    return router;
  }
}

export default StatisticsRouter;