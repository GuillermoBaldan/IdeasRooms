const mongoose = require("moongose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  idea: {
    type: String, //idea id
    required: true,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("room", roomSchema);
