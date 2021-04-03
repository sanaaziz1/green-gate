const express = require("express");
const Settings = require("../models/mongoose/settings");

const router = express.Router();

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

module.exports = router;
