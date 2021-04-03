const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		about: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Settings = mongoose.model("settings", SettingsSchema);

module.exports = Settings;
