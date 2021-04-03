const express = require("express");
const jwt = require("express-jwt");

const isAdmin = require("./isAdmin");
const Settings = require("../../models/mongoose/settings");

const router = express.Router();

router.use(jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), isAdmin);

router.get("/", async (req, res) => {
	const settings = await Settings.findOne();

	try {
		return res.json({
			success: true,
			data: settings,
		});
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.post("/update", async (req, res) => {
	const { title, description, about } = req.body;

	const settings = await Settings.findOne();

	settings.set({
		title,
		description,
		about,
	});

	try {
		await settings.save();
		return res.json({
			success: true,
			message: "Setting updated successfully.",
		});
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

module.exports = router;
