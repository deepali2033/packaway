import axios from "axios";
import api from "./api";
const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        userData
    );

    return response.data;
};
export const getProfile = async () => {
    const response = await api.get("/auth/profile");

    return response.data;
};