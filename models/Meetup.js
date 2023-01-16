const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  invitation: {
    type: Schema.Types.ObjectId,
    ref: "Invitation",
  },
});

module.exports = mongoose.model("Meetup", meetupSchema);
