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
      offset: (Number(_page) - 1) * _limit || 0,
      sort: { created_at: -1 },
    };
    return await db.Activity.paginate({}, options);
  }
  async getActivitiesWithFilter(
    _page = 1,
    _limit = 10,
    _type = "",
    search_query = ""
  ) {
    const options = {
      limit: Number(_limit),
      offset: (Number(_page) - 1) * Number(_limit) || 0,
      sort: { created_at: -1 },
    };
    return await db.Activity.paginate(
      _type === ""
        ? {
            _content: {
              $regex: search_query,
              $options: "i",
            },
          }
        : {
            _type: _type,
            _content: {
              $regex: search_query,
              $options: "i",
            },
          },
      options
    );
  }
})();
