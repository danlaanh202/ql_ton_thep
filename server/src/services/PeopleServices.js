const db = require("../models");
const VietnameseSearchText = require("../../lib/VietnameseSearchText");
module.exports = new (class {
  async getPeopleWithPaginate(_page, _limit) {
    const options = {
      offset: _limit * (parseInt(_page) - 1),
      limit: 10,
      sort: { updated_at: -1 },
    };
    return await db.Person.paginate({}, options);
  }
  async getPeopleWithSearchQuery(_searchQuery, _page = 1, _limit = 20) {
    const options = {
      offset: _limit * (parseInt(_page) - 1) || 0,
      limit: _limit,
      sort: { updated_at: -1 },
    };
    return await db.Person.paginate(
      {
        ten_khach_hang_search: {
          $regex: _searchQuery
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          $options: "i",
        },
      },
      options
    );
  }
  async updateWhenChangeInvoice(_id, so_tien) {
    return await db.Person.findByIdAndUpdate(
      _id,
      {
        $inc: {
          tong_tien_mua: so_tien,
          so_tien_no: so_tien,
        },
      },
      { new: true }
    );
  }
  async payDebt(_id, _money) {
    return await db.Person.findByIdAndUpdate(_id, {
      $inc: {
        so_tien_no: _money,
      },
    });
  }
})();
