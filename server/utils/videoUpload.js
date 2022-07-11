const AWS = require('aws-sdk');
const {nanoid} = require('nanoid');
const {readFileSync} = require('fs');

const awsConfig = {
    accessKeyId:process.env.AWS_ACCESS_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion:process.env.AWS_API_VERSION
};

const S3 = new AWS.S3(awsConfig);


const uploadVideoFromUser = async(req, res) => {
    try {
        const {video} = req.files;
        // console.log(video);
        if(!video){
            res.status(400).send("Video not uploaded")
        }
        const params = {
            //create bucket for videos. 
            Bucket:"digital-cv-videos",
            Key:`${nanoid()}.${video.type.split('/')[1]}`,
            Body:readFileSync(video.path),
            ACL:'public-read',
            ContentType:video.type
        };
        S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            console.log(data);
            res.send(data);
        })
    } catch (err) {
        console.log(err)
    }
}

const removeVideoFromUser = async(req, res) => {
    try {
        const {Location, Bucket, Key} = req.body;
        // console.log(video);
        if(!Bucket || !Key){
            res.status(400).send("Video not Found")
        }
        const params = {
            //create bucket for videos. 
            Bucket,
            Key,
        };
        S3.deleteObject(params, (err, data) => {
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            console.log(data);
            res.send({ok:true});
        })
    } catch (err){
        console.log(err);
    }
}


module.exports = {
    uploadVideoFromUser,
    removeVideoFromUser
}