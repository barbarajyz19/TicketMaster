const User = require("../models/user").model;
const Show = require("../models/show").model;

module.exports.home = (_, res) =>
  res.sendFile("admin.html", { root: "./public" });

module.exports.admin = async (req, res) => {
  const user = await User.findById(req.userId);
  console.log(user);
  console.log(req.userId);
  res.status(200).json({ name: user.name });
};

module.exports.getAllShows = async (_, res) => {
  try {
    const shows = await Show.find();
    console.log(shows);
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createShow = async (req, res) => {
  try {
    const show = new Show(req.body);
    const newShow = await show.save();
    res.status(201).json(newShow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.editShow = async (req, res) => {
  try {
    const showId = req.params.showId;
    const { description, tickets } = req.body;
    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { description: description, tickets: tickets },
      { new: true }
    );
    if (!updatedShow) {
      return res.status(404).json({ error: "Spectacle non trouvé" });
    }
    res.status(200).json({ message: "Spectacle mis à jour avec succès", updatedShow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};