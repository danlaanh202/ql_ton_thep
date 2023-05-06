const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const PersonSchema = new mongoose.Schema(
  {
    ten_khach_hang: {
      type: String,
      required: true,
    },
    ten_khach_hang_search: {
      type: String,
    },
    so_dien_thoai: {
      type: String,
    },
    dia_chi: {
      type: String,
    },
    so_tien_no: {
      type: Number,
    },
    tong_tien_mua: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
PersonSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Person", PersonSchema);
