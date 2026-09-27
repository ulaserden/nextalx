import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Link,
    Stack,
    Typography
} from "@mui/material";

import {
    useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import AssignmentTable
    from "../components/assignments/AssignmentTable";

import DetailHeader
    from "../components/common/DetailHeader";

import InfoGrid
    from "../components/common/InfoGrid";

import StatusChip
    from "../components/common/StatusChip";

import useRecord
    from "../hooks/useRecord";

import useServerList
    from "../hooks/useServerList";

import {
    getEmployee
} from "../services/employeeService";

import {
    getAssignments,
    returnAssignment
} from "../services/assignmentService";

import NotFoundPage
    from "./NotFoundPage";

function EmployeeDetail({
    id
}) {

    const {
        record: employee,
        notFound
    } = useRecord(
        getEmployee,
        id,
        "Employee could not be loaded."
    );

    const current =
        useServerList(
            getAssignments,
            {
                employeeId: id,
                status: "ACTIVE"
            },
            "Assigned assets could not be loaded."
        );

    const history =
        useServerList(
            getAssignments,
            {
                employeeId: id
            },
            "Assignment history could not be loaded."
        );

    const handleReturn =
        async (assignmentId) => {

            const confirmed =
                window.confirm(
                    "Mark this assignment as returned?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await returnAssignment(assignmentId);

                current.reload();

                history.reload();

                toast.success(
                    "Asset returned successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Asset could not be returned."
                );
            }
        };

    if (notFound) {
        return <NotFoundPage />;
    }

    if (!employee) {

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

    return (
        <Box>

            <DetailHeader
                backTo="/employees"
                backLabel="Employees"
                title={`${employee.firstName} ${employee.lastName}`}
                subtitle={
                    [
                        employee.jobTitle,
                        employee.departmentName
                    ]
                        .filter(Boolean)
                        .join(" · ")
                }
                badge={<StatusChip status={employee.status} />}
            />

            <Stack spacing={3}>

                <Card>
                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                                mb: 2
                            }}
                        >
                            Details
                        </Typography>

                        <InfoGrid
                            items={[
                                {
                                    label: "Email",
                                    value: (
                                        <Link
                                            href={`mailto:${employee.email}`}
                                            underline="hover"
                                        >
                                            {employee.email}
                                        </Link>
                                    )
                                },
                                { label: "Phone", value: employee.phone },
                                { label: "Job title", value: employee.jobTitle },
                                { label: "Department", value: employee.departmentName }
                            ]}
                        />

                    </CardContent>
                </Card>

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                            mb: 2
                        }}
                    >
                        Assigned assets ({current.tableProps.rowCount})
                    </Typography>

                    <AssignmentTable
                        {...current.tableProps}
                        hiddenFields={["employeeName", "returnedDate", "status"]}
                        onReturn={handleReturn}
                    />

                </Box>

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                            mb: 2
                        }}
                    >
                        Assignment history
                    </Typography>

                    <AssignmentTable
                        {...history.tableProps}
                        hiddenFields={["employeeName"]}
                        onReturn={handleReturn}
                    />

                </Box>

            </Stack>

        </Box>
    );
}

// Ids are numeric; anything else cannot exist, so skip the requests and
// show the 404 page straight away. Keyed by id so a different record starts
// from a clean state.
function EmployeeDetailPage() {

    const { id } = useParams();

    if (!/^\d+$/.test(id)) {
        return <NotFoundPage />;
    }

    return (
        <EmployeeDetail
            key={id}
            id={id}
        />
    );
}

export default EmployeeDetailPage;
