const mongoose = require("mongoose");

const NurserySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			index: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Nursery = mongoose.model("nursery", NurserySchema);

module.exports = Nursery;
