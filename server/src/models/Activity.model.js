const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ActivitySchema = new mongoose.Schema({
  _type: {
    type: "_export" | "_edit" | "_delete" | "_import" | "_debt",
    // default: "_export",
  },
  content: {
    type: String,
    default: "",
  },
});
ActivitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Activity", ActivitySchema);
