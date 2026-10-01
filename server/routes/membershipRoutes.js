
const express = require("express");


const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");

const {
    joinTrip,leaveTrips,trip,getTripDetails
} = require("../controllers/membershipController");



router.post("/join", authMiddleware, joinTrip);
router.get("/trip", authMiddleware, trip);
router.delete("/leave", authMiddleware, leaveTrips);
router.get("/details", authMiddleware, getTripDetails);
module.exports = router;
