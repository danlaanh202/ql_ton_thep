const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const WareSchema = new mongoose.Schema(
  {
    ten_hang_hoa: {
      type: String,
      required: true,
    },
    ten_hang_hoa_search: {
      type: String,
    },
    gia_ban: {
      type: Number,
      required: true,
    },
    gia_nhap: {
      type: Number,
    },
    so_luong_trong_kho: {
      type: Number,
    },
    so_luong_da_ban: {
      type: Number,
    },
    loai_hang: {
      //  ["Ống", "Hộp", "Tôn", "Lưới", "Khác"]
      type: "Ống" | "Hộp" | "Tôn" | "Lưới" | "Khác",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

WareSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Ware", WareSchema);
