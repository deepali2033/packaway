import ThemeToggle from "../../pages/ThemeToggle";

function Header({ userName }) {
    return (
        <header className="dashboard-header">

            <div className="dashboard-search">

                <span>⌕</span>

                <input
                    type="text"
                    placeholder="Search destinations..."
                />

            </div>

            <div className="header-actions">

                <button className="header-icon">
                    ♡
                </button>

                <button className="header-icon">
                    ♧
                </button>

                <ThemeToggle />

                <div className="header-avatar">
                    {userName.charAt(0).toUpperCase()}
                </div>

            </div>

        </header>
    );
}

export default Header;
