const express = require("express");
const path = require("path");
const fs = require("fs");
const FileType = require("file-type");
const User = require("../models/mongoose/user");
const Nursery = require("../models/mongoose/nursery");

var router = express.Router();

router.get("/uploads/:name", async (req, res) => {
	const name = req.params.name;

	const file = path.resolve(__dirname, "../uploads", name);
	if (!fs.existsSync(file)) {
		res.status(404);
		return res.send("404");
	}

	const fileType = await FileType.fromFile(file);
	if (!fileType) {
		res.status(401);
		return res.send("401");
	}

	res.type(fileType.mime);
	res.sendFile(file);
});

router.get("/display/user/:id", async (req, res) => {
	const id = req.params.id;
	const user = await User.findById(id);

	return res.json({
		success: true,
		data: user,
	});
});

router.get("/display/nursery/:id", async (req, res) => {
	const id = req.params.id;
	const nursery = await Nursery.findById(id);

	return res.json({
		success: true,
		data: nursery,
	});
});

router.use("/products", require("./products"));
router.use("/settings", require("./settings"));

router.use("/user", require("./user"));
router.use("/admin", require("./admin"));
router.use("/nursery", require("./nursery"));

module.exports = router;
