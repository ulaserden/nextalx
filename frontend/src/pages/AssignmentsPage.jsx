import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    Typography
} from "@mui/material";

import AssignmentTable
    from "../components/assignments/AssignmentTable";

import CreateAssignmentDialog
    from "../components/assignments/CreateAssignmentDialog";

import {
    getAssignments,
    createAssignment,
    returnAssignment
} from "../services/assignmentService";

function AssignmentsPage() {

    const [
        assignments,
        setAssignments
    ] = useState([]);

    const [
        openDialog,
        setOpenDialog
    ] = useState(false);

    useEffect(() => {

        loadAssignments();

    }, []);

    const loadAssignments =
        async () => {

            const data =
                await getAssignments(
                    0,
                    100
                );

            setAssignments(
                data.content
            );
        };

    const handleCreate =
        async (
            assignmentData
        ) => {

            await createAssignment(
                assignmentData
            );

            setOpenDialog(
                false
            );

            loadAssignments();
        };

    const handleReturn =
        async (
            id
        ) => {

            await returnAssignment(
                id
            );

            loadAssignments();
        };

    return (
        <>

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    mb: 3
                }}
            >

                <Typography
                    variant="h4"
                >
                    Assignments
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenDialog(
                            true
                        )
                    }
                >
                    Assign Asset
                </Button>

            </Box>

            <AssignmentTable
                assignments={
                    assignments
                }
                onReturn={
                    handleReturn
                }
            />

            <CreateAssignmentDialog
                open={
                    openDialog
                }
                onClose={() =>
                    setOpenDialog(
                        false
                    )
                }
                onSave={
                    handleCreate
                }
            />

        </>
    );
}

export default AssignmentsPage;