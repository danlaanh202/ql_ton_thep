const WareController = require("../controllers/WareController");
const router = require("express").Router();

router.post("/create", WareController.createWare);
router.get("/search", WareController.searchWare);
router.put("/update", WareController.editWare);
router.put("/update_amount", WareController.updateWareAmount);
router.get("/get_with_paginate", WareController.getWaresWithPagination);

module.exports = router;
