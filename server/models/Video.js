const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {ObjectId} = mongoose.Schema;

const videoSchema = new Schema({
    videoName:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    description: {
        type:String,
    },
    content:{
        type:{},
        minlength:200,
    },
    videoLink:{},

}, {timestamps:true});

module.exports = {videoSchema}
