require('dotenv').config();
var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: async ({ req }) => {

    try {

      const currentUser = await admin.auth().verifyIdToken(req.headers.authorization);
      console.log(currentUser);
      return currentUser;

    } catch (err){
      console.log("AUTH CHECK ERROR", err);
      throw new Error('Invalid or Expired Token');
    }
  },
  // signToken: function({ firstName, lastName, email, _id }) {
  //   const payload = { firstName, lastName, email, _id };

  //   console.log(payload);
  //   return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  // },
};