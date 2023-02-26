const personRouter = require("./person.routes");
const invoiceRouter = require("./invoice.routes");
const wareRouter = require("./ware.routes");
function route(app) {
  app.use("/person", personRouter);
  app.use("/invoice", invoiceRouter);
  app.use("/ware", wareRouter);
}
module.exports = route;
