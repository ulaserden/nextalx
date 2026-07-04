import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout() {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#f8fafc"
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Topbar />

                <main
                    style={{
                        padding: "30px"
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;