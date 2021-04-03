const express = require("express");
const jwt = require("express-jwt");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const Product = require("../../models/mongoose/product");
const isNursery = require("./isNursery");

const router = express.Router();
const upload = multer({
	dest: "uploads/",
});

router.use(
	jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
	isNursery
);

router.post(
	"/create",
	upload.single("picture"),
	body("name").notEmpty(),
	body("description").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const picture = req.file;
		if (!picture)
			return res.json({
				success: false,
				message: "Picture is required.",
			});

		const { name, description } = req.body;
		const pictureFilename = picture.filename;
		const nurseryId = req.user.sub;

		const product = new Product({
			name,
			description,
			picture: pictureFilename,
			nursery: nurseryId,
		});

		try {
			await product.save();
			return res.json({
				success: true,
				message: "Product created successfully.",
			});
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

router.get("/list", async (req, res) => {
	try {
		const nurseryId = req.user.sub;
		const products = await Product.where("nursery", nurseryId).find();
		return res.json({ success: true, data: products });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.post("/delete/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		await Product.findByIdAndDelete(productId);
		return res.json({ success: true });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		return res.json({ success: true, data: product });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.post(
	"/:id",
	upload.single("picture"),
	body("name").notEmpty(),
	body("description").notEmpty(),
	async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (!product)
			return res.json({
				success: false,
				message: "Product not found.",
			});

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const picture = req.file;
		if (picture) {
			product.picture = picture.filename;
		}

		const { name, description } = req.body;

		product.name = name;
		product.description = description;

		try {
			await product.save();
			return res.json({
				success: true,
				message: "Product updated successfully.",
			});
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

module.exports = router;
