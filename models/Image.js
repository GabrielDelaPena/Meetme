const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  buffer: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("Invitation", imageSchema);
