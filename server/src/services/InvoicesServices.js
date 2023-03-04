const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const { updatePersonMoneyById } = require("../../lib/personHandle");
const db = require("../models");
const WareServices = require("./WareServices");

module.exports = new (class {
  async createInvoiceFunc(data, newInvoice) {
    updatePersonMoneyById(data.khach_hang_id, {
      so_tien_no_them: data.tong_tien - data.so_tien_tra,
      tong_hoa_don: data.tong_tien,
    });
    WareServices.changeWareAmount(
      data.hang_hoa.map((item) => {
        return {
          stock: item.hang_hoa,
          amount: -parseInt(item.so_luong),
        };
      })
    );
    return await newInvoice.save();
  }
  async getAllInvoices() {
    return await db.Invoice.find({})
      .populate({
        path: "khach_hang",
      })
      .sort({ created_at: -1 });
  }
  async getInvoicesOfId(_id) {
    return await db.Invoice.find({
      khach_hang: _id,
    })
      .populate({
        path: "khach_hang",
      })
      .sort({ created_at: -1 });
  }

  async getByName(_searchQuery, _page = 1, _limit = 10) {
    const options = {
      limit: _limit,
      offset: (parseInt(_page) - 1) * _limit || 0,
      sort: { created_at: -1 },
      populate: ["khach_hang", "hang_hoa.hang_hoa"],
    };
    const findedPeople = await db.Person.find({
      ten_khach_hang: {
        $regex: _searchQuery,
        $options: "i",
      },
    }).limit(10);
    return await db.Invoice.paginate(
      {
        khach_hang: {
          $in: findedPeople.map((item) => item._id),
        },
      },
      options
    );
  }
  async getInvoicesWithPagination(_page, _limit) {
    const options = {
      offset: _limit * (parseInt(_page) - 1),
      limit: _limit,
      populate: ["khach_hang", "hang_hoa.hang_hoa"],
      sort: { _id: -1 },
    };
    return await db.Invoice.paginate({}, options);
  }
  async editInvoice(data) {
    const prevInvoice = await db.Invoice.findByIdAndUpdate(data._id, [
      {
        $set: {
          so_tien_tra: data.so_tien_tra,
        },
      },
    ]);
    await updatePersonMoneyById(data.khach_hang_id, {
      so_tien_no_them: prevInvoice.so_tien_tra - data.so_tien_tra,
      tong_hoa_don: 0,
    });
    return await db.Invoice.findByIdAndUpdate(
      data._id,
      {
        ghi_chu:
          prevInvoice.ghi_chu +
          `<br>-Số tiền trả thay đổi từ ${prevInvoice.so_tien_tra} sang ${data.so_tien_tra}`,
      },
      { new: true }
    );
  }
})();
