const router = require("express").Router();

const ActivityController = require("../controllers/ActivityController");

router.get("/get_activities", ActivityController.getActivities);
router.get(
  "/get_activities_with_filter",
  ActivityController.getActivitiesWithFilter
);

module.exports = router;
