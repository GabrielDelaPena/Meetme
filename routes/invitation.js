const router = require("express").Router();
const invitationController = require("../controllers/invitation");

router.post("/createInvitation", invitationController.createInvitation);

router.post(
  "/deleteInvitation/:invitationID",
  invitationController.deleteInvitation
);

router.get(
  "/getInvitationsBySender/:senderID",
  invitationController.getInvitationsBySender
);

router.get(
  "/getInvitationsByReceiver/:receiverID",
  invitationController.getInvitationsByReceiver
);

router.get(
  "/getInvitationByID/:invitationID",
  invitationController.getInvitationByID
);

module.exports = router;
