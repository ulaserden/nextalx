import { useEffect, useState } from "react";

import AssignmentsTable
    from "../features/assignments/AssignmentsTable";

import {
    getAssignments
} from "../services/assignmentService";

function AssignmentsPage() {

    const [assignments,
        setAssignments] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [page,
        setPage] =
        useState(0);

    const [totalPages,
        setTotalPages] =
        useState(0);

    useEffect(() => {

        const fetchAssignments =
            async () => {

                try {

                    const response =
                        await getAssignments(
                            page,
                            10
                        );

                    setAssignments(
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

        fetchAssignments();

    }, [page]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>
                Assignments
            </h1>

            <AssignmentsTable
                assignments={
                    assignments
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
                    Page {page + 1}
                    {" / "}
                    {totalPages}
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

export default AssignmentsPage;