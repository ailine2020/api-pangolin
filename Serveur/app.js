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
const cookieParser = require('cookie-parser');

// POST SETUP
app.use(express.json());

// CORS SETUP
app.use(cors({
	credentials: true,
	origin: "http://localhost:4200"
}));

// API CALL LOGGIN
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

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