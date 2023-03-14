const db = require("../models");

module.exports = new (class {
  async addActivity(_type, _content) {
    const activity = new db.Activity({
      _type,
      _content,
    });
    return await activity.save();
  }

  async getActivities(_page = 1, _limit = 10) {
    const options = {
      limit: _limit,
      offset: (parseInt(_page) - 1) * _limit || 0,
    };
    return await db.Activity.paginate({}, options);
  }
})();
