var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/message", require("./message"));

module.exports = router;
