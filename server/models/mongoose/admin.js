const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
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
	},
	{
		timestamps: true,
	}
);

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
