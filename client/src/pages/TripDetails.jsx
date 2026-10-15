
import {  useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import { getTripById } from "../services/tripService";
import { joinTrip, leaveTrip } from "../services/membershipService";
import defaultTripImage from "../assets/images/defualt-img.jpg";
import {  getTripMembers } from "../services/tripService";

function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showEditTrip, setShowEditTrip] = useState(false);
const [isJoined, setIsJoined] = useState(false);
const [membershipLoading, setMembershipLoading] = useState(false);


  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
const [membersLoading, setMembersLoading] = useState(true);
const [loading, setLoading] = useState(true);



useEffect(() => {
  const fetchTrip = async () => {
    try {
      setLoading(true);

      const response = await getTripById(id);

      console.log("Trip Details Response:", response);

      if (response.success) {
        setTrip(response.trip);
      } else {
        setTrip(null);
      }
    } catch (error) {
      console.error("Fetch Trip Error:", error);
      setTrip(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchTrip();
  } else {
    setLoading(false);
    setTrip(null);
  }
}, [id]);

useEffect(() => {
  const fetchMembers = async () => {
    try {
      setMembersLoading(true);

      const response = await getTripMembers(id);
      console.log("Members:", response);

      if (response.success) {
        setMembers(response.members || []);
      }
    } catch (error) {
      console.error(
        "Members error:",
        error.response?.data || error.message
      );
    } finally {
      setMembersLoading(false);
    }
  };

  if (id) fetchMembers();
}, [id]);
    const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
    cover_image: "",
    status: "planned",
  });

  const [userName] = useState("Deepali");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
const handleJoinTrip = async () => {
  try {
    setMembershipLoading(true);

    const response = await joinTrip(id);

    if (response.success) {
      setIsJoined(true);
      alert("Trip joined successfully");
    } else {
      alert(response.message || "Failed to join trip");
    }
  } catch (error) {
    console.error("Join Trip Error:", error);
    alert("Failed to join trip");
  } finally {
    setMembershipLoading(false);
  }
};
  const handleOpenEdit = () => {
    setTripForm({
      title: trip.title,
      destination: trip.destination,
      start_date: trip.start_date,
      end_date: trip.end_date,
      budget: trip.budget,
      description: trip.description,
      cover_image: trip.cover_image,
      status: trip.status,
    });

    setShowEditTrip(true);
  };
  const handleLeaveTrip = async () => {
  try {
    setMembershipLoading(true);

    const response = await leaveTrip(id);

    if (response.success) {
      setIsJoined(false);
      alert("You left the trip successfully");
    } else {
      alert(response.message || "Failed to leave trip");
    }
  } catch (error) {
    console.error("Leave Trip Error:", error);
    alert("Failed to leave trip");
  } finally {
    setMembershipLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTripForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditTrip = async (e) => {
    e.preventDefault();

    try {
     
      setTrip((prev) => ({
        ...prev,
        ...tripForm,
      }));

      setShowEditTrip(false);

      alert("Trip Updated Successfully");
    } catch (error) {
      console.error("Update Trip Error:", error);
      alert("Failed to update trip");
    }
  };
if (loading) {
  return <div>Loading trip details...</div>;
}

if (!trip) {
  return <div>Trip not found.</div>;
}
  return (

    <div className="dashboard-page">
      <Sidebar
        userName={userName}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main">
        <Header userName={userName} />

        <section className="trip-details-page">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back to Dashboard
          </button>

          <div className="trip-cover-card">
            <img
              src={trip.cover_image || defaultTripImage}
              alt={trip.title}
            />

            <div className="cover-overlay">
              <span className="status-badge">
                {trip.status}
              </span>

              <h1>{trip.title}</h1>

              <p>📍 {trip.destination}</p>
            </div>
          </div>

          <div className="trip-details-grid">

            <div className="trip-info-card">
              <h2>Trip Overview</h2>

              <div className="info-grid">

                <div className="info-box">
                  <p>Start Date</p>
                  <h4>{trip.start_date}</h4>
                </div>

                <div className="info-box">
                  <p>End Date</p>
                  <h4>{trip.end_date}</h4>
                </div>

                <div className="info-box">
                  <p>Budget</p>
                  <h4>₹ {trip.budget}</h4>
                </div>

                <div className="info-box">
                  <p>Status</p>
                  <h4>{trip.status}</h4>
                </div>

              </div>

              <div className="description-card">
                <h3>Description</h3>
                <p>{trip.description}</p>
              </div>
            </div>

<div className="trip-info-card">
  <h2>Trip Members ({members.length})</h2>

  {membersLoading ? (
    <p>Loading members...</p>
  ) : members.length === 0 ? (
    <p>No members found.</p>
  ) : (
   <div className="members-list">
  {members.map((member) => (
    <div className="info-box" key={member.id}>
      <ol>
        <li>{member.user_name || member.name || "Name not found"}</li>
      </ol>

    </div>
  ))}
</div>
  )}
</div>
           <div className="action-card">
           <h3>Trip Actions</h3>

  <button
    className="create-trip-button"
    onClick={handleOpenEdit}
  >
    ✏️ Edit Trip
  </button>

  {!isJoined ? (
    <button
      className="create-trip-button"
      onClick={handleJoinTrip}
      disabled={membershipLoading}
    >
      {membershipLoading ? "Joining..." : "🤝 Join Trip"}
    </button>
  ) : (
    <button
      className="archive-btn"
      onClick={handleLeaveTrip}
      disabled={membershipLoading}
    >
      {membershipLoading ? "Leaving..." : "🚪 Leave Trip"}
    </button>
  )}

  <button className="archive-btn">
    📦 Archive Trip
  </button>
</div>

          </div>

          {showEditTrip && (
            <div className="trip-modal-overlay">

              <div className="trip-modal">

                <div className="trip-modal-header">
                  <div>
                    <p className="section-label">
                      UPDATE YOUR JOURNEY
                    </p>

                    <h2>Edit Trip</h2>
                  </div>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={() => setShowEditTrip(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleEditTrip}>

                  <div className="form-row">

                    <div className="form-group">
                      <label>Trip Title</label>

                      <input
                        type="text"
                        name="title"
                        value={tripForm.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Destination</label>

                      <input
                        type="text"
                        name="destination"
                        value={tripForm.destination}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-group">
                      <label>Start Date</label>

                      <input
                        type="date"
                        name="start_date"
                        value={tripForm.start_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>End Date</label>

                      <input
                        type="date"
                        name="end_date"
                        value={tripForm.end_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  <div className="form-row">

                    <div className="form-group">
                      <label>Budget</label>

                      <input
                        type="number"
                        name="budget"
                        value={tripForm.budget}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Status</label>

                      <select
                        name="status"
                        value={tripForm.status}
                        onChange={handleChange}
                      >
                        <option value="planned">
                          Planned
                        </option>

                        <option value="ongoing">
                          Ongoing
                        </option>

                        <option value="completed">
                          Completed
                        </option>
                      </select>
                    </div>

                  </div>

                  <div className="form-group">
                    <label>Description</label>

                    <textarea
                      name="description"
                      value={tripForm.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Cover Image URL</label>

                    <input
                      type="text"
                      name="cover_image"
                      value={tripForm.cover_image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="modal-actions">

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowEditTrip(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-trip-button"
                    >
                      Update Trip
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default TripDetails;

