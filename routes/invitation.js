const router = require("express").Router();
const invitationController = require("../controllers/invitation");

router.post("/createInvitation", invitationController.createInvitation);

router.post(
  "/deleteInvitation/:invitationID",
  invitationController.deleteInvitation
);

router.get(
  "/getInvitationsByUser/:firstname",
  invitationController.getInvitationsByUser
);

router.get(
  "/getInvitationByID/:invitationID",
  invitationController.getInvitationByID
);

module.exports = router;
