const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.get("/profile/me", authMiddleware, userController.getMe)
router.put("/edit-info/:id", authMiddleware, userController.updateUser)

router.get("/test", (req, res) =>{
    res.send("hello world i'm testing my backend")
})

module.exports = router
