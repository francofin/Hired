const mongoose = require("mongoose");
const { ObjectId, Schema, model } = mongoose;
const dateFormat = require('../utils/dateFormat');
const {nanoid} = require('nanoid');
const videoSchema = require('./Video');

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
        public_id:`${nanoid()}.${Date.now()}`
    }]
},
videos:[videoSchema],
resumes:{
    type:Array,
},      
articles:{
    type:Array,
},
education:{
    type:Array,
},
profileTextPargaraph: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
profileTextPargaraph2: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
profileTextOptional: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
profileTextOptional2: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
diveristyText: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
esgText: {
    type: String,
    minlength: 30,
    maxlength: 500,
},
age: {
    type: String,
    trim: true
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
updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
},
daysActive: {
    type: Number
},
isPremium: {
    type: Boolean,
    default:false
},
phoneNumber:{
    type:String
},
title:{
    type:String
},
role:{
    type:[String],
    default: ['Job Seeker'],
    enum:['Job Seeker', 'Employer', 'Admin', 'Student',]
},
isCompany:{
    type:Boolean,
    default:false
},
companyName: {
    type: String,
    trim: true,
},
companyEmail: {
    type:String,
    trim:true
},
website:[{
    type:String,
    trim: true
}],
entity:{
    type:[String],
    default: ['Applicant'],
    enum:['Coorporation', 'SBA', 'Candidate', 'Volunteer Association', 'Not For Profit', 'StartUp', 'Applicant',]
},
industry:{
    type:ObjectId,
    ref:"Industry"
},
city: {
    type: String,
    required: false,
    trim: true
},
skills:{
    type:Array
},
wantsToDelete:{
    type:Boolean,
    require: true
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
connections:[{
    type:ObjectId,
    ref:'User'
}],
matchedJobs: [{
    type: ObjectId,
    ref: 'Job',
}],
saveForLater: [{
    type: ObjectId,
    ref: 'Job',
}],
appliedTo: [{
    type: ObjectId,
    ref: 'Job',
}],
stripeSession:{},
   
});

userSchema.virtual('savedJobCount').get(function () {
    return this.saveForLater.length;
});

userSchema.virtual('matchedJobCount').get(function () {
    return this.matchedJobs.length;
});

userSchema.virtual('appliedToCount').get(function () {
    return this.appliedTo.length;
});

userSchema.virtual('daysActiveCount').get(function() {
    const oneDay = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let daysActive = Math.round(currentDate.getTime() - this.createdAt.getTime()) / (oneDay);
    return daysActive.toFixed(0);
  })

const User = model("User", userSchema);
  
module.exports = User;