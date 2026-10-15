
const db = require("../config/db");

// Add a new activity to a trip
const createActivity = async (req, res) => {
    try {
        const {
            trip_id,
            title,
            activity_date,
            start_time,
            end_time,
            location,
            description
        } = req.body;

        // Validate required fields
        if (!trip_id || !title || !activity_date) {
            return res.status(400).json({
                success: false,
                message: "Trip ID, title and date are required"
            });
        }

        // Check whether the trip exists
        const [trips] = await db.query(
            "SELECT id FROM trips WHERE id = ?",
            [trip_id]
        );

        if (trips.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const userId = req.user.id;

        // Check whether the user belongs to this trip
        const [members] = await db.query(
            `SELECT id FROM memberships
             WHERE trip_id = ? AND user_id = ?`,
            [trip_id, userId]
        );

        if (members.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Join this trip before adding activities"
            });
        }

        // Save the activity
        const [result] = await db.query(
            `INSERT INTO itineraries
            (
                trip_id,
                title,
                activity_date,
                start_time,
                end_time,
                location,
                description,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                trip_id,
                title,
                activity_date,
                start_time || null,
                end_time || null,
                location || null,
                description || null,
                userId
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Activity added successfully",
            activityId: result.insertId
        });

    } catch (error) {
        console.error("Add Activity Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// Get all activities for a trip
const getActivities = async (req, res) => {
    try {
        const { trip_id } = req.query;
        const userId = req.user.id;

        if (!trip_id) {
            return res.status(400).json({
                success: false,
                message: "Trip ID is required"
            });
        }

        // Check trip membership
        const [members] = await db.query(
            `SELECT id FROM memberships
             WHERE trip_id = ? AND user_id = ?`,
            [trip_id, userId]
        );

        if (members.length === 0) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this trip"
            });
        }

        const [activities] = await db.query(
            `SELECT *
             FROM itineraries
             WHERE trip_id = ?
             ORDER BY activity_date ASC, start_time ASC`,
            [trip_id]
        );

        return res.status(200).json({
            success: true,
            activities
        });

       } catch (error) {
        console.error("Get Activities Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createActivity,
    getActivities
};
