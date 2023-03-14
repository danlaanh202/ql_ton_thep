const ActivityServices = require("../services/ActivityServices");

module.exports = new (class {
  async getActivities(req, res) {
    try {
      const docs = await ActivityServices.getActivities();
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getActivitiesWithFilter(req, res) {
    try {
      const docs = await ActivityServices.getActivitiesWithFilter(
        req.query._page,
        req.query._limit,
        req.query._type,
        req.query.search_query
      );
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
