const ActivityModel = require("./Activity.model");
const InvoiceModel = require("./Invoice.model");
const PersonModel = require("./Person.model");
const WareModel = require("./Ware.model");

const db = {};
db.Invoice = InvoiceModel;
db.Person = PersonModel;
db.Ware = WareModel;
db.Activity = ActivityModel;
module.exports = db;
