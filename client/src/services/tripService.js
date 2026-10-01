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

    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: {
                
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};