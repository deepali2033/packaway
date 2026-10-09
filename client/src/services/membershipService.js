import axios from "axios";

const API_URL = "http://localhost:5000/api/memberships";


export const joinTrip = async (tripId) => { const token = localStorage.getItem("token"); const response = await axios.post( `${API_URL}/join/${tripId}`, {}, { headers: { Authorization: `Bearer ${token}`, }, } ); return response.data; };


export const leaveTrip = async (tripId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/leave/${tripId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      trip_id: tripId,
    }),
  });

  return response.json();
};

export const getTripMembership = async (tripId) => { 
  
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${API_URL}/trip?trip_id=${tripId}`, { method: "GET", headers: { Authorization: `Bearer ${token}`, }, }); return response.json(); 
};