const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTrip,getMyTrips
} = require("../controllers/tripController");

router.post("/create", authMiddleware, createTrip);
router.get("/", authMiddleware, getMyTrips);



module.exports = router;