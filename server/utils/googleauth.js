const passport = require('passport');
const {Strategy} = require('passport-google-oauth20');
require('dotenv').config();

//Helps set up the passport session. 

function checkLoggedIn(req, res, next){
    const isLoggedIn = true;
    if(!isLoggedIn){
        res.status(401).json({error:"You must be logged In"});
    }
    next();
}


//For Google Log In
const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}

const AUTH_OPTIONS = {
    callbackURL: 'auth/google/callback',
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function veryifyCallback(accessToken, refreshToken, profile, done){
    console.log(accessToken);
    console.log(profile);
    done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, veryifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Read the session from the cookie
passport.deserializeUser((id, done) => {
// User.findById(id).then(user => {
//   done(null, user);
// });
done(null, id);
});
  

app.use(passport.initialize());

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ],
  }));
  
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) { 
console.log('Current user is:', req.user);
const isLoggedIn = req.isAuthenticated() && req.user;
if (!isLoggedIn) {
    return res.status(401).json({
    error: 'You must log in!',
    });
}
next();
};

app.get('/auth/google', 
    passport.authenticate('google', {
    scope: ['email'],
}));

app.get('/auth/google/callback', passport.authenticate('google',{
    failureRedirect:'/failure',
    successRedirect:'/',
    session:false
}), (req, res) => {
    // res.redirect()
    console.log('Google Callback');
});

app.get('/auth/logout', (req, res) => {

})

app.get('/failure', (req,res) => {
    return res.send('failed to log in.')
})

app.get('/secret', checkLoggedIn, (req, res) => {
    return res.send('Your secret is 42');
});


module.exports = passport;