import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getMyTrips } from "../services/tripService";
import { getAllTrips } from "../services/tripService";
import { createTrip } from "../services/tripService";
import defaultTripImage from "../assets/images/defualt-img.jpg"
import "../assets/styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [trips, setTrips] = useState([]);

const navigate=useNavigate();
const handleCreateTrip = async(e)=>{
    e.preventDefault();
    try{
         const data = await createTrip(tripForm);
            console.log("Create Trip Response:", data);
            if(data.success){
                alert("Trip Created Successfully")
                setShowCreateTrip(false)
                 setTripForm({
                title: "",
                destination: "",
                start_date: "",
                end_date: "",
                budget: "",
                description: "",
                cover_image: "",
                status: "planned"

            });
            }
    }
    catch (error) {
        console.error(
            "Create Trip Error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Failed to create trip"
        );
    }
}
const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
    cover_image: "",
    status: "planned"
});
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();

                console.log("Profile:", data);

                setProfile(data.user);
            } catch (error) {
                console.error(
                    "Profile Error:",
                    error.response?.data || error.message
                );
            }
        };
loadTrips();
        loadProfile();
    }, []);
const loadTrips = async () => {
    try {
        const data = await getAllTrips();

        console.log("Trips:", data);

        if (data.success) {
            setTrips(data.trips);
        }

    } catch (error) {
        console.error(
            "Get Trips Error:",
            error.response?.data || error.message
        );
    }
};
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const userName = profile?.name || "Traveler";

    return (
        <div className="dashboard-page">

            {/* ================= SIDEBAR ================= */}
            <Sidebar userName={userName} handleLogout={handleLogout} />


            {/* ================= MAIN CONTENT ================= */}
            <main className="dashboard-main">

                {/* TOP BAR */}
                <Header userName={userName} />


                {/* ================= WELCOME ================= */}
                <section className="dashboard-welcome">

                    <div>

                        <p className="welcome-label">
                            GOOD TO SEE YOU
                        </p>

                        <h1>
                            Where will you
                            <br />
                            go next, {userName}?
                        </h1>

                        <p className="welcome-text">
                            Discover new places, plan your next
                            adventure and travel with your community.
                        </p>

                    </div>

                    <button
                       className="create-trip-button"
                       onClick={() => setShowCreateTrip(true)}
                       >
                    + Create Trip
                    </button>
                </section>
                  {showCreateTrip && (
    <div className="trip-modal-overlay">

        <div className="trip-modal">

            <div className="trip-modal-header">
                <div>
                    <p className="section-label">PLAN YOUR JOURNEY</p>
                    <h2>Create New Trip</h2>
                </div>

                <button
                    className="modal-close"
                    onClick={() => setShowCreateTrip(false)}  >
                    ×
                </button>
            </div>

            
           <form onSubmit={handleCreateTrip}>
                <div className="form-row">

                    <div className="form-group">
                        <label>Trip Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Goa Beach Trip"
                            value={tripForm.title}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    title: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Destination</label>
                        <input
                            type="text"
                            placeholder="e.g. Goa"
                            value={tripForm.destination}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    destination: e.target.value
                                })
                            }
                        />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={tripForm.start_date}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    start_date: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={tripForm.end_date}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    end_date: e.target.value
                                })
                            }
                        />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Budget</label>
                        <input
                            type="number"
                            placeholder="₹ 25,000"
                            value={tripForm.budget}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    budget: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            value={tripForm.status}
                            onChange={(e) =>
                                setTripForm({
                                    ...tripForm,
                                    status: e.target.value
                                })
                            }
                        >
                            <option value="planned">Planned</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>

                    </div>

                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        placeholder="Tell us about your trip..."
                        value={tripForm.description}
                        onChange={(e) =>
                            setTripForm({
                                ...tripForm,
                                description: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Cover Image URL</label>

                    <input
                        type="text"
                        placeholder="https://..."
                        value={tripForm.cover_image}
                        onChange={(e) =>
                            setTripForm({
                                ...tripForm,
                                cover_image: e.target.value
                            })
                        }
                    />
                </div>

                <div className="modal-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setShowCreateTrip(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-trip-button"
                    >
                        Create Trip
                    </button>

                </div>

            </form>

        </div>

    </div>
                  )}

                  {/* ================= POPULAR DESTINATIONS ================= */}
                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <p className="section-label">
                                EXPLORE
                            </p>

                            <h2>
                                Popular destinations
                            </h2>

                        </div>

                        <button className="view-all">
                            View all →
                        </button>

                    </div>


                  

                        {/* CARD 3 */}
                       <div className="travel-grid">

                          {trips.length === 0 ? (
                         <p>No trips created yet.</p>
                          ) : (
                        trips.map((trip) => (
                       <div
                          className="travel-card"
                      key={trip.id}
                    onClick={()=>navigate(`trips/${trip.id}`)}
                        style={{
                    backgroundImage: `url(${
                        trip.cover_image
                            ? trip.cover_image
                            : defaultTripImage
                    })`
                }}
            >

                <div className="travel-card-overlay">

                    <span>
                        {trip.status || "PLANNED"}
                    </span>

                    <h3>
                        {trip.title}
                    </h3>

                    <p>
                        {trip.destination}
                    </p>

                    <p>
                        {new Date(
                            trip.start_date
                        ).toLocaleDateString()}
                        {" - "}
                        {new Date(
                            trip.end_date
                        ).toLocaleDateString()}
                    </p>

                    {trip.budget && (
                        <p>
                            ₹{trip.budget}
                        </p>
                    )}

                </div>

            </div>
        ))
                           )}

                        </div>


                </section>


                {/* ================= BOTTOM AREA ================= */}
                <section className="dashboard-bottom">

                    {/* UPCOMING TRIPS */}
                    <div className="upcoming-card">

                        <div className="section-heading">

                            <div>

                                <p className="section-label">
                                    YOUR JOURNEY
                                </p>

                                <h2>
                                    Upcoming trips
                                </h2>

                            </div>

                            <button className="view-all">
                                See all →
                            </button>

                        </div>


                        <div className="trip-list">

                            {/* TRIP 1 */}
                            <div className="trip-item">

                                <div className="trip-image trip-image-one">
                                    🏔️
                                </div>

                                <div className="trip-info">

                                    <strong>
                                        Himalayan Adventure
                                    </strong>

                                    <span>
                                        Manali • 12 - 18 Sep
                                    </span>

                                </div>

                                <span className="trip-status">
                                    Planned
                                </span>

                            </div>


                            {/* TRIP 2 */}
                            <div className="trip-item">

                                <div className="trip-image trip-image-two">
                                    🏝️
                                </div>

                                <div className="trip-info">

                                    <strong>
                                        Goa Beach Trip
                                    </strong>

                                    <span>
                                        Goa • 04 - 08 Oct
                                    </span>

                                </div>

                                <span className="trip-status">
                                    Planned
                                </span>

                            </div>


                            {/* TRIP 3 */}
                            <div className="trip-item">

                                <div className="trip-image trip-image-three">
                                    🌲
                                </div>

                                <div className="trip-info">

                                    <strong>
                                        Forest Retreat
                                    </strong>

                                    <span>
                                        Coorg • 21 - 25 Oct
                                    </span>

                                </div>

                                <span className="trip-status">
                                    Planned
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* EXPLORE CARD */}
                    <div className="explore-card">

                        <div className="explore-icon">
                            ✦
                        </div>

                        <p>
                            READY TO EXPLORE?
                        </p>

                        <h2>
                            Your next
                            <br />
                            adventure awaits.
                        </h2>

                        <span>
                            Find amazing destinations and
                            connect with fellow travelers.
                        </span>

                        <button>
                            Explore Trips →
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;