import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "250px",
                height: "100vh",
                backgroundColor: "#1e293b",
                color: "white",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >
            <h2>Nextalx</h2>

            <hr />

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "20px"
                }}
            >
                <Link to="/" style={linkStyle}>
                    Dashboard
                </Link>

                <Link to="/employees" style={linkStyle}>
                    Employees
                </Link>

                <Link to="/departments" style={linkStyle}>
                    Departments
                </Link>

                <Link to="/assets" style={linkStyle}>
                    Assets
                </Link>

                <Link to="/categories" style={linkStyle}>
                    Categories
                </Link>

                <Link to="/assignments" style={linkStyle}>
                    Assignments
                </Link>
            </nav>
        </div>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
};

export default Sidebar;