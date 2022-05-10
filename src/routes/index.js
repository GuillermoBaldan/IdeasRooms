const res = require("express/lib/response");

const router = require("express").Router();
const vote = require("../models/vote");
const Idea = require("../models/idea");

router.get("/", async (req, res) => {
  const ideas = await Idea.find({}).sort({ date: "desc" }).lean();
  console.log(ideas);
  res.render("index", { ideas });
});

router.get("/About", (req, res) => {
  res.render("about");
});

module.exports = router;
