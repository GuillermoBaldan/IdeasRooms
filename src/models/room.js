const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  idea: {
    type: String, //idea id
    required: true,
  },
  comments: [{ type: Schema.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("room", roomSchema);
