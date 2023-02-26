const db = require("../models");

module.exports = new (class {
  async getPeopleWithPaginate(_page, _limit) {
    const options = {
      offset: _limit * (parseInt(_page) - 1),
      limit: 10,
    };
    return await db.Person.paginate({}, options);
  }
})();
