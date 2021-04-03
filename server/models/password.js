const bcrypt = require("bcryptjs");

module.exports = {
	hash: async (password) => {
		return await bcrypt.hash(password, 10);
	},
	verify: async (password, hash) => {
		return await bcrypt.compare(password, hash);
	},
};
