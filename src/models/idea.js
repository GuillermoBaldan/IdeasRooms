const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = mongoose.model("user");
const voteSchema = mongoose.model("vote");

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  manager: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  collaborators: [{ type: Schema.ObjectId, ref: "user" }],
  votes: [{ type: Schema.ObjectId, ref: "vote" }],
});

module.exports = mongoose.model("idea", IdeaSchema);
