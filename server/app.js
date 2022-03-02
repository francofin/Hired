const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const app = express();

app.use(helmet()); 


app.use(cors({
    origin:'http://localhost:3000',
}));

app.use(morgan('combined'));
app.use(express.json());

// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.get('/*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// })


module.exports = app;