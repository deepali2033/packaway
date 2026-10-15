const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
    createTrip,getMyTrips,getAllTrips,getTripById
} = require("../controllers/tripController");

router.post("/create", authMiddleware, createTrip);
router.get("/", authMiddleware, getMyTrips);

router.get("/all", authMiddleware, getAllTrips);
router.get("/:id", getTripById);


module.exports = router;

