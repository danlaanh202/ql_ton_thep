const db = require("../models");

module.exports = new (class {
  async getPeopleWithPaginate(_page, _limit) {
    const options = {
      offset: _limit * (parseInt(_page) - 1),
      limit: 10,
    };
    return await db.Person.paginate({}, options);
  }
  async getPeopleWithSearchQuery(_searchQuery, _page = 1, _limit = 10) {
    const options = {
      offset: _limit * (parseInt(_page) - 1) || 0,
      limit: _limit,
      // sort: ,
    };
    return await db.Person.paginate(
      {
        ten_khach_hang: {
          $regex: _searchQuery,
          $options: "i",
        },
      },
      options
    );
  }
})();
