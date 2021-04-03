const express = require("express");
const { body, validationResult } = require("express-validator");
const Admin = require("../../models/mongoose/admin");

const { hash, verify } = require("../../models/password");
const { createToken } = require("../../models/token");

const router = express.Router();

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

		const isThereAny = await Admin.countDocuments();
		let admin;

		if (!isThereAny) {
			// create initial admin
			admin = new Admin({
				name: "Super",
				email,
				password: await hash(password),
			});
			try {
				await admin.save();
			} catch (e) {
				return res.json({
					success: false,
					message: e.message,
				});
			}
		} else {
			admin = await Admin.findOne({ email: email });
			if (!admin)
				return res.json({
					success: false,
					message: "No Admin was found with this email.",
				});

			const passwordGood = await verify(password, admin.password);
			if (!passwordGood)
				return res.json({
					success: false,
					message: "Password is wrong.",
				});
		}

		try {
			const token = createToken("admin", admin);
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
