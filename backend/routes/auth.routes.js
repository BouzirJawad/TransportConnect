const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.");
const {
  validateLogin,
  validateRegister,
  checkValidation,
} = require("../middleware/validate.middleware");

router.post("/auth/register", validateRegister, checkValidation, authController.register)
router.post("/auth/login", validateLogin, checkValidation, authController.login)

router.get("/test", (req, res) =>{
    res.send("hello world i'm testing my backend")
})

module.exports = router

