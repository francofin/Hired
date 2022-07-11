const mongoose = require("mongoose");
const { ObjectId, Schema, model } = mongoose;
const dateFormat = require('../utils/dateFormat');
const videoSchema = require('./Video');

const jobSchema = new Schema({
email: {
  type: String,
  trim: true
},
title:{
  type:String,
  trim: true
},
descriptionParagraph: {
  type: String,
  required: true,
  required: 'Please tell us about this role',
  minlength: 30,
  maxlength: 100000
},
descriptionParagraph2: {
  type: String,
  required: true,
  required: 'Describe the skills required for this role',
  minlength: 30,
  maxlength: 100000
},
descriptionOptional: {
  type: String,
  required: false,
  minlength: 30,
  maxlength: 100000
},
descriptionOptional2: {
  type: String,
  required: false,
  minlength: 30,
  maxlength: 100000
},
images:{
  type:Array,
  default:[{
      url:'https://via.placeholder.com/200x200.png?text=Profile Images',
      public_id:Date.now
  }]
},
videos:[videoSchema],
createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
},
updatedAt: {
  type: Date,
  default: Date.now,
  get: (timestamp) => dateFormat(timestamp),
},
daysActive: {
  type: Number
},
employer: {
    type: ObjectId,
    ref:"User"
},
stateLocation: {
  type: String,
  required: false,
  trim: true
},
streetAddress:{
  type:String,
  require: false,
  trim: true
},
zipPostalCode:{
  type:String,
  required: false,
  trim:true
},
country: {
  type: String,
  required: false,
  trim: true
},
positionFilled: {
  type: Boolean,
  required: true,
  default: false
},
skills: {
  type: Array,
},
applicants: [{
  type: ObjectId,
  ref: 'User',
}],
candidates: [{
  type: ObjectId,
  ref: 'User',
}],
matchedCandidates: [{
  type: ObjectId,
  ref: 'User',
}],
}, {timestamps:true});


jobSchema.virtual('applicantCount').get(function () {
  return this.applicants.length;
});

jobSchema.virtual('candidateCount').get(function () {
  return this.candidates.length;
});

jobSchema.virtual('matchCount').get(function () {
  return this.matchedCandidates.length;
});

jobSchema.virtual('daysActiveCount').get(function() {
  const oneDay = 1000 * 60 * 60 * 24;
  let currentDate = new Date();
  let daysActive = Math.round(currentDate.getTime() - this.createdAt.getTime()) / (oneDay);
  return daysActive.toFixed(0);
})

const Job = model("Job", jobSchema);
  
module.exports = Job;