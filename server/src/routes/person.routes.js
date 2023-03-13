const PersonController = require("../controllers/PersonController");

const router = require("express").Router();

// [POST] create person
router.post("/post", PersonController.createPerson);
// [GET] get people with query: ten_khach_hang
router.get("/get_people", PersonController.getPeopleWithSearchQuery);
// [GET] get all people, when finish we will create limit and skip
router.get("/get", PersonController.getPeople);
//[GET] get people with paginate params:{_page, _limit}
router.get("/get_with_paginate", PersonController.getPeopleWithPagination);

router.put("/pay_debt", PersonController.payDebt);

module.exports = router;
