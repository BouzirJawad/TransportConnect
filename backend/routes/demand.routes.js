const express = require("express")
const router = express.Router()
const demandController = require("../controllers/demand.controller")
const authMiddleware = require('../middleware/auth.middleware')
const driverMiddleware = require("../middleware/driver.middleware")
const shipperMiddleware = require("../middleware/shipper.middleware")

router.get("/getbyannouncement/:id", authMiddleware, demandController.getDemandsByAnnouncement)
router.get("/incomingdemands", authMiddleware, driverMiddleware, demandController.getPendingDemands)
router.get("/getone/:id", authMiddleware, demandController.getDemand)
router.get("/getshipperdemands", authMiddleware, shipperMiddleware, demandController.getShipperDemands)
router.post("/create", authMiddleware, shipperMiddleware, demandController.createDemand)
router.put("/update/:id", authMiddleware, demandController.updateDemand)
router.get("/history", authMiddleware, shipperMiddleware, demandController.getShipperHistory)
router.put("/cancel/:id", authMiddleware, demandController.CancelDemand)

module.exports = router