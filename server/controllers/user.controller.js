const User = require("../models/user").model;
const Show = require("../models/show").model;

module.exports.home = (_, res) =>
  res.sendFile("user.html", { root: "./public" });

module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({
      name: user.name,
      tickets: user.tickets,
    });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error:
        "Erreur serveur lors de la récupération des informations de l'utilisateur",
    });
  }
};

module.exports.getAdminShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
    console.log("shows:", shows);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des spectacles de l'admin",
    });
  }
};

module.exports.takeTicket = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId);
    res.status(200).json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.putTicket = async (req, res) => {
  try {
    const ticketData = { ...req.body };
    console.log("data ticket :", ticketData);
    if (!ticketData.description) {
      return res.status(400).json({ message: "Description manquante" });
    }
    const existingTicket = await User.findOneAndUpdate(
      { _id: req.userId, "tickets.description": ticketData.description },
      { $inc: { "tickets.$.nb": 1 } },
      { new: true }
    );
    if (existingTicket) {
      console.log("Ticket existant mis à jour :", existingTicket);
      return res
        .status(200)
        .json({ message: "Mise à jour du ticket existant réussie" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { tickets: { description: ticketData.description, nb: 1 } } },
      { new: true }
    );
    console.log("Nouveau ticket ajouté :", updatedUser);
    res.status(200).json({ message: "Nouveau ticket ajouté" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de l'ajout d'un ticket au spectacle",
    });
  }
};

module.exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { tickets: { _id: ticketId } } },
      { new: true }
    );
    res.status(200).json({ message: "Suppression réussie" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du ticket",
    });
  }
};
