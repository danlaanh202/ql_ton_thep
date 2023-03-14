const personRouter = require("./person.routes");
const invoiceRouter = require("./invoice.routes");
const wareRouter = require("./ware.routes");
const activityRouter = require("./activity.routes");
function route(app) {
  app.use("/person", personRouter);
  app.use("/invoice", invoiceRouter);
  app.use("/ware", wareRouter);
  app.use("/activity", activityRouter);
}
module.exports = route;
