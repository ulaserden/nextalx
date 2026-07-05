import { useEffect, useState } from "react";

import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

import AssignmentsTable
    from "../features/assignments/AssignmentsTable";

import {
    getAssignments
} from "../services/assignmentService";

function AssignmentsPage() {

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAssignments = async () => {

            try {

                const response = await getAssignments(
                    0,
                    100
                );

                setAssignments(
                    response.content
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        fetchAssignments();

    }, []);

    if (loading) {
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
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: 600
                }}
            >
                Assignments
            </Typography>

            <AssignmentsTable
                assignments={assignments}
            />
        </Box>
    );
}

export default AssignmentsPage;