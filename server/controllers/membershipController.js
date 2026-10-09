const db = require("../config/db");



const joinTrip = async (req, res) => {
    try {
        const { trip_id } = req.params;
        const user_id = req.user.id;

        if (!trip_id) {
            return res.status(400).json({
                success: false,
                message: "Trip ID is required"
            });
        }


    
        const [trip] = await db.query(
            "SELECT id FROM trips WHERE id = ?",
            [trip_id]
        );

        if (trip.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const [existing] = await db.query(
            "SELECT id FROM memberships WHERE trip_id = ? AND user_id = ?",
            [trip_id, user_id]
        );
        
        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You have already joined this trip"
            });
        }
        // Join trip
        await db.query(
            "INSERT INTO memberships (trip_id, user_id, role, joined_at) VALUES (?, ?, ?, NOW())",
            [trip_id, user_id, "member"]
        );

        return res.status(201).json({
            success: true,
            message: "Trip joined successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const trip = async (req, res) => {
    try {
        const { trip_id } = req.query;

        if (!trip_id) {
            return res.status(400).json({
                success: false,
                message: "Trip ID is required"
            });
        }

        const [members] = await db.query(
            `SELECT memberships.id,
                    memberships.trip_id,
                    memberships.user_id,
                    memberships.role,
                    memberships.joined_at
             FROM memberships
             WHERE memberships.trip_id = ?`,
            [trip_id]
        );

        return res.status(200).json({
            success: true,
            members: members
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const leaveTrips = async (req, res) => {
    try {
        const { trip_id } = req.params;
        const user_id = req.user.id;

        if (!trip_id) {
            return res.status(400).json({
                success: false,
                message: "Trip ID is required"
            });
        }

        const [result] = await db.query(
            "DELETE FROM memberships WHERE trip_id = ? AND user_id = ?",
            [trip_id, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "You are not a member of this trip"
            });
        }

        return res.status(200).json({
            success: true,
            message: "You left the trip successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

};

const getTripDetails = async (req, res) => {
    try {
        const { trip_id } = req.query;

        if (!trip_id) {
            return res.status(400).json({
                success: false,
                message: "Trip ID is required"
            });
        }

        const [trips] = await db.query(
            "SELECT * FROM trips WHERE id = ?",
            [trip_id]
        );

        if (trips.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const [members] = await db.query(
            `SELECT id, trip_id, user_id, role, joined_at
             FROM memberships
             WHERE trip_id = ?`,
            [trip_id]
        );

        return res.status(200).json({
            success: true,
            trip: trips[0],
            members: members
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    joinTrip,
    leaveTrips,
    trip,
    getTripDetails,
  
};
