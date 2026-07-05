import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import DashboardPage
    from "../pages/DashboardPage";

import EmployeesPage
    from "../pages/EmployeesPage";

import DepartmentsPage
    from "../pages/DepartmentsPage";

import CategoriesPage
    from "../pages/CategoriesPage";

import AssetsPage
    from "../pages/AssetsPage";

import AssignmentsPage
    from "../pages/AssignmentsPage";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    element={
                        <MainLayout />
                    }
                >

                    <Route
                        path="/"
                        element={
                            <DashboardPage />
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <EmployeesPage />
                        }
                    />

                    <Route
                        path="/departments"
                        element={
                            <DepartmentsPage />
                        }
                    />

                    <Route
                        path="/categories"
                        element={
                            <CategoriesPage />
                        }
                    />

                    <Route
                        path="/assets"
                        element={
                            <AssetsPage />
                        }
                    />

                    <Route
                        path="/assignments"
                        element={
                            <AssignmentsPage />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;