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
        url:"https://digital-cv.s3.us-east-1.amazonaws.com/pexels-pixabay-36717.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQD1saIWjeM1AwXvkyngIRlMb8b8n%2B7Zk9lm1rEP8jrmTQIhAJbZNbj%2BmvnKFFpLwBDN1tuzLAgE0EhV3SPnvEJHhPxiKvsCCB8QABoMMTM3MzE1NzE1OTU5Igw8pYjLVQUNqDhsAAkq2AKCWwr%2Ful6CXBrtajG%2Ba1kAy%2FoWMVkDRoq690SEr%2F9khhFQbGeglQYMo1B1Xy57afTiJSL3Kzohps7yIS1cf6UyEQGlaFIupslchUV1499HbWPQxtCfOPnfNTGQlkSBh7qbTgREOJHV67xkigAOn%2F33vpgG7shg9zDZvD1Z8zFg%2BA05ieZeGmitldJCeiBYMTY3JB9R7wodK0jQ%2FbWcIcVEsdybRnnHC%2Bxa9oRXGqvyjwRTe04uNNGJKIZewkXnnfUJSnpTRfN%2Bu%2BCnpYur2QYXNDDI1wyovhYCSmnJt4GwHWNYX7kFeXbMmIA%2Fbj6Z78PmUD5GfBX0PfTQ5XLHTipdefIvtZ1b4UyBGEC%2FCvfuEHNK8NRrNIBOATFIvQF4RlD9OJgDUxXI3nfrYDGr2WC41dwUhY8AK%2F5YZEQHQZIDTU96%2FePfmuq7jnaNQR%2FW3bXGu3hyzjI%2B9TCYhsaXBjqyAkFRtHxvOKQGTkurdG0SVegVzvS9Lefz3tPMpHPB7SzLy2UqcuzLeOBcSKKsfBSyrkrnZc3K3ocb6umfuZ915R82PDhztP5Pe4uWoJqlPSIYzBpjJq5aN%2F8njRluyRv1uDzB%2BiD%2F%2BiKa2XS9iLB2%2BZ3PluAPZz3i%2Bcr%2F9lGm1sz9OEr7KWfb%2Bra8tL%2BD5cZaIGRctLi9u78Y1g%2Bsac3TpCegxGAvmFy5rh7JwzYrSn9T4V2PsE4Em3%2Bj%2BJ7T3TRHAhgO7cYKZU2rou66d9AwOBQNum0rGWCk4vIMbfTKT4qToMeb8cKczQmdp%2BtptRMuyoxSqS5GGFbvTNklDG90mQ1H7Ws%2BVgQYKkIkJIC%2FUewkITMJmHYmhwJ5aGw0rd2EooSbfPMfy2mIkIUKpsxwKPObzw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220808T214301Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR76FHRN3WX77QS5K%2F20220808%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=64739ae1b4c2cf63aaf9587509dfa71fa512cf54f1d8fe539872fbc7d874ddec",
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