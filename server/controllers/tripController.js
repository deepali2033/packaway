const db = require("../config/db");



const createTrip = async (req, res) => {
    try {
        const {
            title,
            destination,
            start_date,
            end_date,
            cover_image,
            description,
            budget,
        } = req.body;

        if (!title || !destination || !start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        const userId = req.user.id;

        const [result] = await db.query(
            `INSERT INTO trips
            (
                user_id,
                created_by,
                title,
                destination,
                start_date,
                end_date,
                cover_image,
                description,
                budget
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                userId,
                title,
                destination,
                start_date,
                end_date,
                cover_image || null,
                description || null,
                budget || null
            ]
        );

        await db.query(
            `INSERT INTO memberships
            (trip_id, user_id, role, joined_at)
            VALUES (?, ?, ?, NOW())`,
            [tripId, userId, "owner"]
        );

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            tripId: result.insertId
        });

    } catch (error) {
        console.error("Create Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getMyTrips = async (req, res)=>{
 try { 

    const userId = req.user.id;
    const [trips] = await db.query(
            `SELECT *
             FROM trips
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [userId]
        );
        res.status(200).json({
            success:true,
            trips
        });
    }
    catch(error){
       console.error("Get Trips Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
module.exports = {
    createTrip,
    getMyTrips
};