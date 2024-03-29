const mongoose = require("mongoose");
const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const db = require("../models");
const VietnameseSearchText = require("../../lib/VietnameseSearchText");

module.exports = new (class {
  async getWithPagination(_page, _limit) {
    const options = {
      limit: _limit || 10,
      offset: (Number(_page) - 1) * _limit,
      sort: { updated_at: -1 },
    };
    return await db.Ware.paginate({}, options);
  }
  async createWare(_data) {
    const newWare = new db.Ware({
      ten_hang_hoa: _data.ten_hang_hoa,
      ten_hang_hoa_search: _data.ten_hang_hoa
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      gia_ban: _data.gia_ban,
      gia_nhap: _data.gia_nhap,
      so_luong_trong_kho: _data.so_luong,
      so_luong_da_ban: 0,
      loai_hang: _data.loai_hang,
    });
    return await newWare.save();
  }
  async changeWareAmount(_wares) {
    // need _wares = [{ stock: {...}, amount }]

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
    return await db.Ware.findByIdAndUpdate(doc._id, {
      ten_hang_hoa: doc.ten_hang_hoa,
      gia_ban: Number(doc.gia_ban),
      gia_nhap: Number(doc.gia_nhap),
      so_luong_trong_kho: Number(doc.so_luong_trong_kho),
      so_luong_da_ban: Number(doc.so_luong_da_ban),
    });
  }
  async searchWare(_searchQuery, _page = 1, _limit = 20) {
    const options = {
      limit: _limit,
      offset: (Number(_page) - 1) * _limit || 0,
      sort: {
        ten_hang_hoa: 1,
      },
    };
    // console.log(VietnameseSearchText(_searchQuery));
    return await db.Ware.paginate(
      {
        // $text: {
        //   $search: _searchQuery
        //     .toLowerCase()
        //     .normalize("NFD")
        //     .replace(/[\u0300-\u036f]/g, ""),
        // },
        ten_hang_hoa_search: {
          // $regex: VietnameseSearchText(_searchQuery),
          $regex: _searchQuery
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          $options: "i",
        },
      },
      options
      // { score: { $meta: "textScore" } }
    );
  }
  async deleteWare(_id) {
    return await db.Ware.findByIdAndDelete(_id);
  }
})();
