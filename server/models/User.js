const mongoose = require("mongoose");
const { ObjectId, Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
      },
    lastName: {
        type: String,
        trim: true,
    },
    userName:{
        type:String,
        required:true,
        index:true,
        unique:true
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
        default:[{
            url:'https://via.placeholder.com/200x200.png?text=Profile Images',
            public_id:Date.now
        }]
    },
    videos:{
        type:Array,
    },
    articles:{
        type:Array,
    },
      profileTextPargaraph: {
        type: String,
        minlength: 30,
        maxlength: 300,
    },
    profileTextPargaraph2: {
        type: String,
        minlength: 30,
        maxlength: 300,
    },
    profileTextOptional: {
        type: String,
        minlength: 30,
        maxlength: 300,
    },
    profileTextOptional2: {
        type: String,
        minlength: 30,
        maxlength: 300,
    },
    age: {
        type: String,
        trim: true
    },
    region: {
        type: Schema.Types.ObjectId,
        ref:"Region"
    },
    stateLocation: {
        type: Schema.Types.ObjectId,
        ref:"StateLocation"
    },
    city: {
        type: Schema.Types.ObjectId,
        ref:"City"
    },
    birthday: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    isPremium: {
        type: Boolean,
    },
    role:{
        type:['String'],
        default: ['Job Seeker'],
        enum:['Job Seeker', 'Employer', 'Admin', ]
    },
    stripeSession:{},
   
});

const User = model("User", userSchema);
  
module.exports = User;