const router = require("express").Router();
const meetupController = require("../controllers/meetup");

router.post("/createMeetup", meetupController.createMeetup);

router.post("/deleteMeetup/:meetupID", meetupController.deleteMeetup);

router.get("/getMeetupsByUser/:userID", meetupController.getMeetupsByUser);

router.get("/getMeetupByID/:meetupID", meetupController.getMeetupByID);

module.exports = router;
