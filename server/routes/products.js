const express = require("express");
const Product = require("../models/mongoose/product");

const router = express.Router();

router.get("/list", async (req, res) => {
	try {
		const limit = parseInt(req.query.limit);

		const products = await Product.find()
			.sort({ "createdAt": "desc" })
			.limit(limit)
			.populate("nursery")
			.exec();

		return res.json({ success: true, data: products });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/search", async (req, res) => {
	try {
		const query = req.query.query;
		const queryExp = new RegExp(query, "i");

		const products = await Product.find({ name: queryExp })
			.populate("nursery")
			.exec();

		return res.json({ success: true, data: products });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findById(productId)
			.populate("nursery")
			.exec();
		return res.json({ success: true, data: product });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

module.exports = router;
