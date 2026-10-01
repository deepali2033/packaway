function Sidebar({ userName, handleLogout }) {
    return (
        <aside className="dashboard-sidebar">

            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    P
                </div>

                <span>PackAway</span>
            </div>

            <nav className="sidebar-menu">

                <button className="sidebar-item active">
                    <span>⌂</span>
                    Dashboard
                </button>

                <button className="sidebar-item">
                    <span>◫</span>
                    My Trips
                </button>

                <button className="sidebar-item">
                    <span>♧</span>
                    Explore
                </button>

                <button className="sidebar-item">
                    <span>♧</span>
                    Memberships
                </button>

                <button className="sidebar-item">
                    <span>♡</span>
                    Favorites
                </button>

                <button className="sidebar-item">
                    <span>⚙</span>
                    Settings
                </button>

            </nav>

            <div className="sidebar-bottom">

                <div className="sidebar-user">

                    <div className="user-avatar">
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <strong>
                            {userName}
                        </strong>

                        <small>
                            Traveler
                        </small>
                    </div>

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    ↪
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
