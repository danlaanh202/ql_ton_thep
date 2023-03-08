const mongoose = require("mongoose");
// mongoose.Schema.Types.String.checkRequired(v => v != null);
const mongoosePaginate = require("mongoose-paginate-v2");
const InvoiceSchema = new mongoose.Schema(
  {
    khach_hang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    so_tien_tra: {
      type: Number,
      default: 0,
    },
    ngay_mua: {
      type: Date,
      default: Date.now(),
    },
    ghi_chu: {
      type: String,
    },
    tong_tien: {
      type: Number,
    },

    hang_hoa: {
      type: [
        {
          hang_hoa: { type: mongoose.Schema.Types.ObjectId, ref: "Ware" },
          don_gia: { type: Number, required: true },
          so_luong: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
InvoiceSchema.post("save", function (next) {
  this.tong_tien = this.hang_hoa.reduce(
    (prev, curr) => {
      return prev + curr.so_luong * curr.don_gia;
    },
    [0]
  );
  next();
});
InvoiceSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Invoice", InvoiceSchema);
