const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    description: { type: String, required: true, unique: true },
    tickets: {
      type: Number,
      default: 10,
      min: 1,
      max: 99999,
      set: function (value) {
        if (value < 1) {
          return 1;
        } else if (value > 99999) {
          return 99999;
        } else {
          return value;
        }
      },
    },
  });

const db = require('../controllers/db.controller.js');
const Show = db.model('Show', showSchema, 'show');
module.exports.model = Show;
