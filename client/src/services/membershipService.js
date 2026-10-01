import axios from "axios";

const API_URL = "http://localhost:5000/api/memberships";

export const joinTrip = async (trip_id) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/join`,
        { trip_id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};