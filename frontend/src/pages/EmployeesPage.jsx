import { useEffect, useState } from "react";

import EmployeesTable from "../features/employees/EmployeesTable";
import { getEmployees } from "../services/employeeService";

function EmployeesPage() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const response = await getEmployees(
                        page,
                        10
                );

                setEmployees(
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

        fetchEmployees();

    }, [page]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
            <div>

                <h1>
                    Employees
                </h1>

                <EmployeesTable
                        employees={employees}
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
                            disabled={page === 0}
                            onClick={() =>
                                    setPage(page - 1)
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
                                    setPage(page + 1)
                            }
                    >
                        Next
                    </button>
                </div>

            </div>
    );
}

export default EmployeesPage;