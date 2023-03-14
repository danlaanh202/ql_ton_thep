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
})();
