const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const validator = require("../middleware/authValidator");

router.post("/login", validator.loginValidator, authController.login);

router.get("/logout", authController.logout);

module.exports = router;
