const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTrip,getMyTrips,getAllTrips
} = require("../controllers/tripController");

router.post("/create", authMiddleware, createTrip);
router.get("/", authMiddleware, getMyTrips);

router.get("/all", authMiddleware, getAllTrips);

module.exports = router;