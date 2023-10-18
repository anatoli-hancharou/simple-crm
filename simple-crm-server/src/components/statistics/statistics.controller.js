class StatisticsController {
  constructor(statisticsService) {
    this.statisticsService = statisticsService;
  }

  getStatusDistributionOverTimeRange = async (req, res) => {
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;
    const stats = await this.statisticsService.getStatuses(req.user.user_id, from, to);
    return res.status(200).send(stats);
  }
}

export default StatisticsController;