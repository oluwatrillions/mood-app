const router = require("express").Router();
const verifyEmail = require("../../../controllers/verifyEmail");

router.get("/:verificationToken", verifyEmail);

module.exports = router;
