import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

export const createTrip = async (tripData) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/create`,
        tripData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getMyTrips = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};



export const getTripById = async (id) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(
            `${API_URL}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Trip API URL:", `${API_URL}/${id}`);
        console.error("HTTP Status:", error.response?.status);
        console.error("Backend Response:", error.response?.data);

        throw error;
    }
};
export const getAllTrips = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:5000/api/trips/all",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const getTripMembers = async (tripId) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:5000/api/memberships/trip",
        {
            params: { trip_id: tripId },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};