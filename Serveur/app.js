require("dotenv").config();
require("./config/mongo");

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Strategy = require('passport-local').Strategy;
const User = require("./models/pangolin");



// POST SETUP
app.use(express.json());

// CORS SETUP
// app.use(cors("*"));
app.use(cors(["http://localhost:4200", "http://localhost:8888"]));

// API CALL LOGGIN
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// passport will add a user to the session...
passport.serializeUser((user, cbk) => {
	cbk(null, user);
});
//...and retrieve it from session
passport.deserializeUser((user, cbk) => {
	cbk(null, user);
});

// configuring a local strategy 
// == using username and password to identify and authorize a user
passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password'
}, (name, password, cbk) => {
	User.findOne({
		username: name
	}, (err, user) => {
		if (err) {
			console.error(`could not find ${name} in MongoDB`, err);
		}
		if (!user) {
			console.error('Incorrect username');
			cbk(null, false)
		}
		if (user.password !== password) {
			console.error(`wrong password for ${name}`);
			cbk(null, false);
		} else {
			console.error(`${name} found in MongoDB and authenticated`);
			cbk(null, user);
		}
	});
}));

// SESSION SETUP
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		// name: 'api-pangolin',
		cookie: {
			maxAge: 60000
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60,
		}),
		saveUninitialized: true,
		resave: true,
	})
);


app.use("/auth", require("./routes/api-auth2"));
app.use("/api/pangolin", require("./routes/api.pangolin"));


module.exports = app;