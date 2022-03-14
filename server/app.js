const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { authCheck } = require('./utils/auth') ;

const app = express();



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




app.use(cors('*'));

app.use(morgan('combined'));
app.use(express.json());

// app.use(authCheck);


// app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/rest', function(req, res) {
    res.json({
        data: 'you hit rest endpoint great!'
    });
});

// app.get('/*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })


module.exports = app;