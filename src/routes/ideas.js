const router = require("express").Router();

const vote = require("../models/vote");
const Idea = require("../models/idea");
const { isAuthenticated } = require("../helpers/auth");

router.get("/ideas/add", isAuthenticated, (req, res) => {
  res.render("ideas/new-idea");
});

router.post("/ideas/new-idea", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a title" });
  }
  if (!description) {
    errors.push({ text: "Please Write a description" });
  }
  if (errors.length > 0) {
    res.render("ideas/new-ideas", {
      errors,
      title,
      description,
    });
  } else {
    const newIdea = new Idea({ title, description });
    newIdea.user = req.user._id;
    newIdea.manager = req.user._id;
    await newIdea.save();
    req.flash("success_msg", "Idea Added Successfully");
    res.redirect("/ideas");
  }
});

router.get("/ideas", isAuthenticated, async (req, res) => {
  const ideas = await Idea.find({ manager: req.user._id })
    .sort({ date: "desc" })
    .lean();
  res.render("ideas/all-ideas", { ideas });
});

router.get("/ideas/edit/:id", isAuthenticated, async (req, res) => {
  const idea = await Idea.findById(req.params.id).lean();
  res.render("ideas/edit-idea", { idea });
});
//Me quedé aquí.
router.put("/ideas/edit-idea/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Idea.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Idea Updated Successfully");
  res.redirect("/ideas");
});

router.put("/ideas/join/:id", isAuthenticated, async (req, res) => {
  let idea = await Idea.findById(req.params.id).lean();
  idea.collaborators.push(req.user);
  await Idea.findByIdAndUpdate(req.params.id, {
    collaborators: idea.collaborators,
  });
  req.flash("success_msg", "Join into this idea successfully");
  res.redirect("/ideas");
});

router.delete("/ideas/delete/:id", isAuthenticated, async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Idea deleted Successfully");
  res.redirect("/ideas");
});

module.exports = router;
