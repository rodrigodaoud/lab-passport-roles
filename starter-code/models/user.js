'use strict'
const mongoose = require('mongoose');
const passportlocalmongoose = require("passport-local-mongoose");
const Schema   = mongoose.Schema;


const userSchema = new Schema({

  username: String,
  password: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['Boss', 'Developer', 'Teacher Assistant', 'Student'],
    default: 'Student'
  }
}, {
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
  },
});

userSchema.plugin(passportlocalmongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;