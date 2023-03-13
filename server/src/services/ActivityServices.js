const db = require("../models");

module.exports = new (class {
  async addActivity(_type, _content) {
    const activity = new db.Activity({
      _type,
      _content,
    });
    return await activity.save();
  }
})();
