import express from 'express';

class StatisticsRouter {
  constructor(statisticsController) {
    this.statisticsController = statisticsController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/get-status-distribution').get(this.statisticsController.getStatusDistributionOverTimeRange);
    return router;
  }
}

export default StatisticsRouter;