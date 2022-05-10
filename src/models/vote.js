const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("vote", voteSchema);
