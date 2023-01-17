const Invitation = require("../models/Invitation");
const User = require("../models/User");

exports.createInvitation = async (req, res) => {
  const users = req.body.users;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const date = req.body.date;
  const description = req.body.description;
  const location = req.body.location;
  const accepted = false;

  const invitation = new Invitation({
    users: users,
    lat: lat,
    lon: lon,
    date: date,
    description: description,
    location: location,
    accepted: accepted,
  });

  try {
    await invitation.save();
    res.status(200).send("New Invitation Created.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.deleteInvitation = async (req, res) => {
  const invitationID = req.params.invitationID;

  const invitation = await Invitation.findOne({ _id: invitationID });
  if (!invitation) {
    return res.status(400).send("Invitation not found.");
  }

  try {
    await Invitation.findByIdAndRemove(invitation._id);
    res.status(200).send("Invitation deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.getInvitationByID = async (req, res) => {
  const invitationID = req.params.invitationID;

  try {
    const invitation = await Invitation.findOne({ _id: invitationID }).populate(
      "users"
    );
    if (!invitation) {
      return res.status(400).send("Invitation not found.");
    }

    res.status(200).send(invitation);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.getInvitationsByUser = async (req, res) => {
  const userID = req.params.userID;

  try {
    const invitations = await Invitation.find({
      users: { $in: [userID] },
    }).populate("users");
    if (!invitations) {
      return res.status(400).send("User has no such invitations.");
    }

    res.status(200).send(invitations);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invitation not found.");
  }
};

exports.deleteInvitation = async (req, res) => {
  const invitationID = req.params.invitationID;

  try {
    await Invitation.findByIdAndRemove(invitationID);
    res.status(200).send("Invitaion deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Invitation not found.");
  }
};
