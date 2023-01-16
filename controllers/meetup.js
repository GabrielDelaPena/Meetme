const Meetup = require("../models/Meetup");
const User = require("../models/User");

exports.createMeetup = async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const invitation = req.body.invitation;

  try {
    const meetup = new Meetup({
      sender: sender,
      receiver: receiver,
      invitation: invitation,
    });
    await meetup.save();
    res.status(200).send("Meetup created.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.getMeetupsByUser = async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(400).send("No User found.");
    }

    const meetups = await Meetup.find({
      $or: [{ sender: userID }, { receiver: userID }],
    })
      .populate("sender")
      .populate("receiver");
    if (meetups.length <= 0) {
      return res.status(400).send("No Meetup found.");
    }

    res.status(200).send(meetups);
  } catch (error) {
    console.log(error);
    res.status(500).send("No Meetup found.");
  }
};

exports.getMeetupByID = async (req, res) => {
  const meetupID = req.params.meetupID;

  try {
    const meetup = await Meetup.findOne({ _id: meetupID })
      .populate("sender")
      .populate("receiver");
    if (!meetup) {
      return res.status(400).send("Meetup not found.");
    }
    res.status(200).send(meetup);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.deleteMeetup = async (req, res) => {
  const meetupID = req.params.meetupID;

  try {
    await Meetup.findByIdAndRemove(meetupID);
    res.status(200).send("Meetup deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};
