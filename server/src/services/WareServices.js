const mongoose = require("mongoose");
const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const db = require("../models");

module.exports = new (class {
  async getWithPagination(_page, _limit) {
    const options = {
      limit: _limit || 10,
      offset: (parseInt(_page) - 1) * _limit,
      sort: { updated_at: -1 },
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
      loai_hang: _data.loai_hang,
    });
    return await newWare.save();
  }
  async changeWareAmount(_wares) {
    const operations = _wares.map((item, index) => {
      return {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(item.stock._id) },
          update: {
            $inc: {
              so_luong_trong_kho: item.amount,
            },
          },
          upsert: true,
        },
      };
    });
    return await db.Ware.bulkWrite(operations);
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
  async searchWare(_searchQuery, _page = 1, _limit = 10) {
    const options = {
      limit: _limit,
      offset: (parseInt(_page) - 1) * _limit || 0,
      sort: { updated_at: -1 },
    };
    return await db.Ware.paginate(
      {
        ten_hang_hoa: {
          $regex: _searchQuery,
          $options: "i",
        },
      },
      options
    );
  }
})();
