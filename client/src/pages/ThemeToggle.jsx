import { useEffect, useState } from "react";

function ThemeToggle() {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = darkMode ? "dark" : "light";

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem("theme", theme);
    }, [darkMode]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    );
}

export default ThemeToggle;