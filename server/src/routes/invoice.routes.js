const InvoiceController = require("../controllers/InvoiceController");

const router = require("express").Router();

// [POST] create invoice
router.post("/post", InvoiceController.createInvoice);
router.get("/get", InvoiceController.getInvoices);
router.get("/get_with_paginate", InvoiceController.getInvoicesWithPagination);
router.get("/get_by_person_id", InvoiceController.getInvoicesOfId);
router.get("/get_with_query", InvoiceController.getInvoicesByName);
router.put("/change_invoice_info", InvoiceController.changeInvoiceInfo);
router.get("/get_test", InvoiceController.editWareListsOfInvoice);
router.put("/change_ware_of_invoice", InvoiceController.editWareListsOfInvoice);
module.exports = router;
