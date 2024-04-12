const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  login : {
            type : String,
            required : true,
            unique : true
          },
  password : {
              type : String,
              required : true
             },
  admin : {
            type : Boolean,
            default: false
          },
  tickets: [{ description: String, nb: Number }]


  });

module.exports = userSchema;
const db = require('../controllers/db.controller.js');
const User = db.model('User', userSchema, 'users');
module.exports.model = User;
