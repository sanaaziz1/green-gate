const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../../models/mongoose/user");
const { hash, verify } = require("../../models/password");
const { createToken } = require("../../models/token");

const router = express.Router();

router.post(
	"/sign-up",
	body("name").notEmpty(),
	body("email").isEmail(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid.",
				data: errors.array(),
			});

		const { name, email, password } = req.body;

		const matchingAccounts = await User.countDocuments({ email: email });
		if (matchingAccounts > 0)
			return res.json({
				success: false,
				message: "This email is associated with another account.",
			});

		const user = new User({
			name,
			email,
			password: await hash(password),
		});
		try {
			await user.save();
			return res.json({
				success: true,
				message: "User created successfully.",
			});
		} catch (e) {
			return res.json({
				success: false,
				message: e.message,
			});
		}
	}
);

router.post(
	"/sign-in",
	body("email").isEmail(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid.",
				data: errors.array(),
			});

		const { email, password } = req.body;

		const user = await User.findOne({ email: email });
		if (!user)
			return res.json({
				success: false,
				message: "No User was found with this email.",
			});

		const passwordGood = await verify(password, user.password);
		if (!passwordGood)
			return res.json({
				success: false,
				message: "Password is wrong.",
			});

		try {
			const token = createToken("user", user);
			return res.json({
				success: true,
				data: token,
			});
		} catch (e) {
			return res.json({
				success: false,
				message: e.message,
			});
		}
	}
);

module.exports = router;
