const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
var session = require("express-session");
const logger = require("morgan");

const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const imagesRoute = require("./routes/images");
const passportSetup = require("./passport");
const passport = require("passport");
let cookieParser = require("cookie-parser");
app.use(cookieParser());

var sess = {
	secret: "keyboard cat",
	cookie: { maxAge: 24 * 60 * 60 * 100 },
};
app.use(session(sess));

app.use(logger("dev"));
app.use(express.json());


app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: (origin, callback) => {
			return callback(null, true)
		},
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/upload", uploadRoute);
app.use("/images", imagesRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	return res.send({ error: true, message: "hello" });
});

const server = app.listen(5000, function () {
	console.log("Server is running on port 5000");
});
module.exports = app;
