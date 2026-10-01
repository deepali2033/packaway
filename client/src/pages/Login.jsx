import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import ThemeToggle from "./ThemeToggle";
import "../assets/styles/auth.css";
function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const data = await loginUser({
                email,
                password
            });

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-topbar">
                <div className="brand">
                    <div className="brand-logo">
                        P
                    </div>

                    <span>PackAway</span>
                </div>

                <ThemeToggle />
            </div>

            <div className="auth-container">

                <div className="auth-card">

                    <div className="auth-content">

                        <span className="auth-small-title">
                            WELCOME BACK
                        </span>

                        <h1>
                            Let's continue
                            <br />
                            your journey.
                        </h1>

                        <p className="auth-description">
                            Sign in to manage your trips,
                            memberships and travel plans.
                        </p>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>

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

                            <div className="input-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
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
                                Sign In
                                <span>→</span>
                            </button>

                        </form>

                        <div className="auth-footer">
                            <span>
                                Don't have an account?
                            </span>

                            <button
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Create account
                            </button>
                        </div>

                    </div>

                    <div className="auth-visual">

                        <div className="visual-overlay">

                            <span>
                                EXPLORE • DISCOVER • TRAVEL
                            </span>

                            <h2>
                                Your next
                                <br />
                                adventure awaits.
                            </h2>

                            <p>
                                Plan your journey,
                                connect with people
                                and travel together.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;