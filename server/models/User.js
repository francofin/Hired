const mongoose = require("mongoose");
const { ObjectId, Schema, model } = mongoose;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
        index: true
      },
      images:{
          type:Array,
          default:{
              url:'https://via.placeholder.com/200x200.png?text=Profile Images',
              public_id:'123'
          }
      },
      age: {
        type: String,
        required: true,
        trim: true
      },
      birthday: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
      },
})