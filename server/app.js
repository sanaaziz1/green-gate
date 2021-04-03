var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const db = require("./models/db");
var mainRouter = require("./routes");
const Settings = require("./models/mongoose/settings");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// create settings
(async () => {
	const isSettings = await Settings.countDocuments();
	if (!isSettings) {
		const settings = new Settings({
			title: "Green Gate",
			description:
				"Green Gate provides a platform for both nurseries and plant enthusiasts to buy, sell, and get information about different plants.",
		});
		await settings.save();
	}
})();

app.use("/", mainRouter);

module.exports = app;
