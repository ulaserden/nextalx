import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import AssetsPage from "../pages/AssetsPage";
import CategoriesPage from "../pages/CategoriesPage";
import AssignmentsPage from "../pages/AssignmentsPage";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<MainLayout />}
                >

                    <Route
                        index
                        element={<DashboardPage />}
                    />

                    <Route
                        path="employees"
                        element={<EmployeesPage />}
                    />

                    <Route
                        path="departments"
                        element={<DepartmentsPage />}
                    />

                    <Route
                        path="assets"
                        element={<AssetsPage />}
                    />

                    <Route
                        path="categories"
                        element={<CategoriesPage />}
                    />

                    <Route
                        path="assignments"
                        element={<AssignmentsPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;