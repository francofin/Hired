const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { authCheck } = require('./utils/auth') ;
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const AWS = require('aws-sdk');
const app = express();
const {nanoid} = require('nanoid');
const {uploadVideoFromUser, removeVideoFromUser} = require('./utils/videoUpload');
const { authCheckImageMiddleware } = require('./utils/auth');
const formidableMiddleware  = require('express-formidable');

require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API
})

app.use(cors());

// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());






app.use(morgan('combined'));
app.use(express.json({limit: "10mb"}));
app.use(bodyParser.json({limit: '10mb'}))
// app.use(authCheck);


// app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/rest', function(req, res) {
    res.json({
        data: 'you hit rest endpoint great!'
    });
});


app.post('/uploadimagestocloudinary', authCheckImageMiddleware, (req, res)=>{
    cloudinary.uploader.upload(req.body.image, (result) => {
        console.log("Image Upload Result", result)
        res.send({
            url: result.secure_url,
            public_id: result.public_id
        })
    }, {
        public_id: `${nanoid()}.${Date.now()}`,
        resource_type:'auto'
    });
});



app.post('/removeimagesfromcloudinary',authCheckImageMiddleware, (req, res) => {
    let imageId = req.body.public_id;

    cloudinary.uploader.destroy(imageId, (error, result)=>{
        if(error){
            return res.json({success:false, error})
        }
        res.send('ok');
    });
});


app.post('/uploadvideouser', authCheckImageMiddleware, formidableMiddleware(), uploadVideoFromUser )
app.post('/removevideouser', authCheckImageMiddleware, removeVideoFromUser)


// app.get('/*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })


module.exports = app;