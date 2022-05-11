const router = require("express").Router();

const Idea = require("../models/idea");
const Rooms = require("../models/room");
const { isAuthenticated } = require("../helpers/auth");

router.get("/room/add", isAuthenticated, (req, res) => {
  res.render("rooms/idea-selection", { Idea });
});

router.get("/room/single", isAuthenticated, (req, res) => {
  console.log("esto es una prueba single");
});

router.get("/ideas/idea4room/:id", isAuthenticated, async (req, res) => {
  const idea = await Ideas.findById(req.params.id).lean();
  res.render("rooms/idea4room", { idea });
});

router.post("/rooms/new-room", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a title" });
  }
  if (errors.length > 0) {
    res.render("rooms/new-room", {
      errors,
      title,
      description,
    });
  } else {
    const newRoom = new Room({ title });
    newRoom.user = req.user._id;
    await newRoom.save();
    req.flash("success_msg", "Room Added Successfully");
    res.redirect("/all-rooms");
  }
});

router.get("/rooms", isAuthenticated, async (req, res) => {
  const Rooms = await Room.find({ user: req.user._id })
    .sort({ date: "desc" })
    .lean();
  res.render("rooms/all-Rooms", { Rooms });
});

router.get("/rooms/edit/:id", isAuthenticated, async (req, res) => {
  const Room = await Room.findById(req.params.id).lean();
  res.render("rooms/edit-room", { Room });
});
//Me quedé aquí.
router.put("/rooms/edit-room/:id", isAuthenticated, async (req, res) => {
  const { title } = req.body;
  await Room.findByIdAndUpdate(req.params.id, { title });
  req.flash("success_msg", "Room Updated Successfully");
  res.redirect("/rooms");
});

router.delete("/room/delete/:id", isAuthenticated, async (req, res) => {
  await room.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "room Deleted Successfully");
  res.redirect("/rooms");
});

module.exports = router;
