const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		nursery: {
			type: Schema.Types.ObjectId,
			ref: "nursery",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		from: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
