const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const membershipRoutes = require("./routes/membershipRoutes");


const itineraryRoutes = require("./routes/itineraryRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/itinerary", itineraryRoutes);
// Home route
app.get("/", (req, res) => {
    res.json({
        message: "PackAway API is running"
    });
});

// API test route
app.get("/api/test-db", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1 AS test");

        res.json({
            success: true,
            message: "MySQL connected successfully",
            result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});