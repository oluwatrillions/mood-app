const router = require("express").Router();
const verifyEmail = require("../../../controllers/verifyEmail");

router.get("/verify", verifyEmail);

module.exports = router;
