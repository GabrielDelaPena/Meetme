const Invitation = require("../models/Invitation");
const User = require("../models/User");

exports.createInvitation = async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const date = req.body.date;
  const description = req.body.description;
  const location = req.body.location;

  const invitation = new Invitation({
    sender: sender,
    receiver: receiver,
    lat: lat,
    lon: lon,
    date: date,
    description: description,
    location: location,
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
    const invitation = await Invitation.findOne({ _id: invitationID });
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
  const email = req.params.email;

  try {
    const invitations = await Invitation.find({
      $or: [{ sender: email }, { receiver: email }],
    });
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
