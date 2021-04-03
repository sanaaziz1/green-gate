const express = require("express");
const jwt = require("express-jwt");
const { body, validationResult } = require("express-validator");
const Message = require("../../models/mongoose/message");
const Product = require("../../models/mongoose/product");
const _ = require("lodash");
const isNursery = require("./isNursery");

const router = express.Router();

router.use(
	jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
	isNursery
);

router.post(
	"/create",
	body("content").notEmpty(),
	body("user").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const { content, user } = req.body;

		const message = new Message({
			content,
			user,
			nursery: req.user.sub,
			from: "nursery",
		});

		try {
			await message.save();
			return res.json({
				success: true,
				message: "Message created successfully.",
			});
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

router.get("/list/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const nurseryId = req.user.sub;
		const messages = await Message.where("nursery", nurseryId)
			.where("user", userId)
			.find();

		return res.json({ success: true, data: messages });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/list", async (req, res) => {
	try {
		const nurseryId = req.user.sub;
		const messages = await Message.where("nursery", nurseryId)
			.select("user")
			.find()
			.populate("user")
			.exec();

		let users = [];
		messages.forEach((msg) => {
			users.push(msg.user);
		});
		users = _.uniq(users);

		return res.json({ success: true, data: users });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

module.exports = router;
