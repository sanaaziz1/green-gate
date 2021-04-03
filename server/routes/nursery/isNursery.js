const isNursery = (req, res, next) => {
	if (req.user && req.user.userType === "nursery") return next();
	return res.json({ success: false, message: "Token is invalid." });
};

module.exports = isNursery;
