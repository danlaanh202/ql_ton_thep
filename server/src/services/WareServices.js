const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const db = require("../models");

module.exports = new (class {
  async getWithPagination(_page, _limit) {
    const options = {
      limit: _limit || 10,
      offset: (parseInt(_page) - 1) * _limit,
    };
    return await db.Ware.paginate({}, options);
  }
  async createWare(_data) {
    const newWare = new db.Ware({
      ten_hang_hoa: _data.ten_hang_hoa,
      gia_ban: _data.gia_ban,
      gia_nhap: _data.gia_nhap,
      so_luong_trong_kho: _data.so_luong,
      so_luong_da_ban: 0,
      // do_day: _data.do_day,
      // trong_luong: _data.trong_luong,
      loai_hang: _data.loai_hang,
    });
    return await newWare.save();
  }
  async changeWareAmount(_id, amount) {
    return await db.Ware.findByIdAndUpdate(
      _id,
      {
        $inc: {
          so_luong_trong_kho: amount,
        },
      },
      { new: true }
    );
  }
  async editWare(doc) {
    return await db.Ware.findByIdAndUpdate(
      doc._id,
      checkUndefinedObject({
        ten_hang_hoa: doc.ten_hang_hoa,
        gia_ban: doc.gia_ban,
        gia_nhap: doc.gia_nhap,
        so_luong_trong_kho: doc.so_luong_trong_kho,
        so_luong_da_ban: doc.so_luong_da_ban,
        do_day: doc.do_day,
        trong_luong: doc.trong_luong,
      })
    );
  }
  async searchWare(_searchQuery) {
    return await db.Ware.find({
      ten_hang_hoa: {
        $regex: _searchQuery,
        $options: "i",
      },
    });
  }
})();
