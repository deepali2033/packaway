
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createActivity,
    getActivities
} = require("../controllers/itineraryController");

router.post("/", authMiddleware, createActivity);
router.get("/", authMiddleware, getActivities);

module.exports = router;
