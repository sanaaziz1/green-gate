const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		nursery: {
			type: Schema.Types.ObjectId,
			ref: "nursery",
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
