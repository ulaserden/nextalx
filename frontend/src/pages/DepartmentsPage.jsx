import { useEffect, useState } from "react";

import DepartmentsTable
    from "../features/departments/DepartmentsTable";

import {
    getDepartments
} from "../services/departmentService";

function DepartmentsPage() {

    const [departments, setDepartments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    useEffect(() => {

        const fetchDepartments =
            async () => {

                try {

                    const response =
                        await getDepartments(
                            page,
                            10
                        );

                    setDepartments(
                        response.content
                    );

                    setTotalPages(
                        response.totalPages
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchDepartments();

    }, [page]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>
                Departments
            </h1>

            <DepartmentsTable
                departments={
                    departments
                }
            />

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <button
                    disabled={
                        page === 0
                    }
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </button>

                <span>
                    Page {page + 1} / {totalPages}
                </span>

                <button
                    disabled={
                        page + 1 >= totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default DepartmentsPage;