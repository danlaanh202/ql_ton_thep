const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ActivitySchema = new mongoose.Schema(
  {
    _type: {
      type: String,
      //  "_edit" | "_delete" | "_import" | "_debt", "_create"
    },
    _content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
ActivitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Activity", ActivitySchema);
