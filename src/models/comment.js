const mongoose = require("moongose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: String, //user id
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  room: {
    type: String, //room id
    required: true,
  },
});

module.exports = mongoose.model("comment", commentSchema);
