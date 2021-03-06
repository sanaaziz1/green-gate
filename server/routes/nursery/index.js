var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/profile", require("./profile"));
router.use("/message", require("./message"));

module.exports = router;
