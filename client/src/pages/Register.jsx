import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import axios from "axios";
import ThemeToggle from "./ThemeToggle";

import "../assets/styles/auth.css";
function Register() {

    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");

          
            const response = await registerUser(
               
                {
                    name,
                    email,
                    password
                }
            );

            setSuccess(response.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
       <div className="auth-page">

            {/* Top Bar */}
            <div className="auth-topbar">

                <div className="brand">
                    <div className="brand-logo">
                        P
                    </div>

                    <span>PackAway</span>
                </div>

                <ThemeToggle />

            </div>

            {/* Register Card */}
            <div className="auth-container">

                <div className="auth-card">

                    {/* Left Side */}
                    <div className="auth-content">

                        <span className="auth-small-title">
                            START YOUR JOURNEY
                        </span>

                        <h1>
                            Create your
                            <br />
                            travel story.
                        </h1>

                        <p className="auth-description">
                            Create your PackAway account and
                            start planning unforgettable journeys.
                        </p>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-success">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>

                            {/* Name */}
                            <div className="input-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="input-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                className="auth-button"
                                type="submit"
                            >
                                Create Account
                                <span>→</span>
                            </button>

                        </form>

                        {/* Login */}
                        <div className="auth-footer">

                            <span>
                                Already have an account?
                            </span>

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Sign in
                            </button>

                        </div>

                    </div>

                    {/* Right Image */}
                    <div className="auth-visual">

                        <div className="visual-overlay">

                            <span>
                                PLAN • CONNECT • EXPLORE
                            </span>

                            <h2>
                                Travel isn't just
                                <br />
                                about the destination.
                            </h2>

                            <p>
                                It's about the places you discover,
                                the experiences you collect and
                                the people you meet along the way.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;