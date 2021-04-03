const jsonwebtoken = require("jsonwebtoken");

module.exports.createToken = (type, obj) => {
	return jsonwebtoken.sign(
		{
			userType: type,
			sub: obj._id,
		},
		process.env.SECRET,
		{
			expiresIn: "30 days",
		}
	);
};
