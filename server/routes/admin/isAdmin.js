const isAdmin = (req, res, next) => {
	if (req.user && req.user.userType === "admin") return next();
	return res.json({ success: false, message: "Token is invalid." });
};

module.exports = isAdmin;
