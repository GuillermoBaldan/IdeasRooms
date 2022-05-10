const mongoose = require("moongose");
const { Schema } = mongoose;

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
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);
