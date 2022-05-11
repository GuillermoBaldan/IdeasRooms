const res = require("express/lib/response");

const router = require("express").Router();
const vote = require("../models/vote");
const Idea = require("../models/idea");
const User = require("../models/user");

//funciones auxiliares
function addName(users, idUser) {
  let result;
  users.forEach((element) => {
    if (element._id == idUser) {
      result = element.name;
    }
  });
  return result;
}

function constructed(ideas, users) {
  ideas.forEach((idea) => {
    idea.author = addName(users, idea.manager.valueOf());
  });
  return ideas;
}

function getCollaboratorsName(idea, users) {
  let collaborators_name = [];
  idea.collaborators.forEach((collaborator) => {
    collaborators_name.push(addName(users, collaborator.valueOf()));
  });
  return collaborators_name;
}
//rutas
router.get("/", async (req, res) => {
  let ideas = await Idea.find({}).sort({ date: "desc" }).lean();
  let users = await User.find({}).lean();
  ideas = constructed(ideas, users);
  ideas.forEach((idea) => {
    idea.collaborators_name = getCollaboratorsName(idea, users);
  });
  res.render("index", { ideas });
});

router.get("/About", (req, res) => {
  res.render("about");
});

module.exports = router;
