import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    CircularProgress,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

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

    const [assignments, setAssignments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [openDialog, setOpenDialog] =
        useState(false);

    const loadAssignments =
        async () => {

            try {

                const data =
                    await getAssignments(
                        0,
                        100
                    );

                setAssignments(
                    data.content
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Assignments could not be loaded."
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        loadAssignments();

    }, []);

    const handleCreate =
        async (assignmentData) => {

            try {

                await createAssignment(
                    assignmentData
                );

                setOpenDialog(false);

                await loadAssignments();

                toast.success(
                    "Asset assigned successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Assignment could not be created."
                );
            }
        };

    const handleReturn =
        async (id) => {

            const confirmed =
                window.confirm(
                    "Mark this assignment as returned?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await returnAssignment(id);

                await loadAssignments();

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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color="text.primary"
                >
                    Assignments
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenDialog(true)
                    }
                >
                    Assign Asset
                </Button>
            </Box>

            <AssignmentTable
                assignments={assignments}
                onReturn={handleReturn}
            />

            <CreateAssignmentDialog
                open={openDialog}
                onClose={() =>
                    setOpenDialog(false)
                }
                onSave={handleCreate}
            />

        </Box>
    );
}

export default AssignmentsPage;
