
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import defaultTripImage from "../assets/images/defualt-img.jpg";
import "../assets/styles/dashboard.css";

function TripDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showEditTrip, setShowEditTrip] = useState(false);

  const [trip, setTrip] = useState({
    id,
    title: "Goa Beach Vacation",
    destination: "Goa, India",
    start_date: "2026-09-10",
    end_date: "2026-09-15",
    budget: 25000,
    status: "planned",
    description:
      "Enjoy a relaxing vacation in Goa with beaches, cafes, water sports and sunset views. This trip is planned for 5 days with friends.",
    cover_image: defaultTripImage,
  });

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

            <div className="action-card">
              <h3>Trip Actions</h3>

              <button
                className="create-trip-button"
                onClick={handleOpenEdit}
              >
                ✏️ Edit Trip
              </button>

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

