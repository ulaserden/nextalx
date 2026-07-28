import { lazy, Suspense } from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import MainLayout
    from "../layouts/MainLayout";

const DashboardPage =
    lazy(() => import("../pages/DashboardPage"));

const EmployeesPage =
    lazy(() => import("../pages/EmployeesPage"));

const DepartmentsPage =
    lazy(() => import("../pages/DepartmentsPage"));

const CategoriesPage =
    lazy(() => import("../pages/CategoriesPage"));

const AssetsPage =
    lazy(() => import("../pages/AssetsPage"));

const AssignmentsPage =
    lazy(() => import("../pages/AssignmentsPage"));

const NotFoundPage =
    lazy(() => import("../pages/NotFoundPage"));

function PageFallback() {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5
            }}
        >
            <CircularProgress />
        </Box>
    );
}

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
                            <Suspense fallback={<PageFallback />}>
                                <DashboardPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <EmployeesPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/departments"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <DepartmentsPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/categories"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <CategoriesPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/assets"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <AssetsPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/assignments"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <AssignmentsPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <NotFoundPage />
                            </Suspense>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
