require('dotenv').config();

let authorized = true;

module.exports = {
    authCheck: (req, res, next = (f) => f) => {
        if(authorized){
            next();
        } else{
            throw new Error('Unauthorized');
        }
    }
};