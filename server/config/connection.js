const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = mongoose.connection;