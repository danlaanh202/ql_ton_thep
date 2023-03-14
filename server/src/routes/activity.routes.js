const router = require("express").Router();

const ActivityController = require("../controllers/ActivityController");

router.get("/get_activities", ActivityController.getActivities);

module.exports = router;
