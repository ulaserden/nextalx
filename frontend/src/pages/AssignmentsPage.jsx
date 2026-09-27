import {
    useState
} from "react";

import {
    Box,
    Button,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

import ListFilterBar
    from "../components/common/ListFilterBar";

import SelectFilter
    from "../components/common/SelectFilter";

import useDebouncedValue
    from "../hooks/useDebouncedValue";

import useServerList
    from "../hooks/useServerList";

import {
    ASSIGNMENT_STATUS_OPTIONS
} from "../constants/filterOptions";

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

    const [openDialog, setOpenDialog] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const debouncedSearch =
        useDebouncedValue(search);

    const {
        tableProps,
        reload
    } = useServerList(
        getAssignments,
        {
            search: debouncedSearch.trim(),
            status: statusFilter
        },
        "Assignments could not be loaded."
    );

    const hasActiveFilters =
        Boolean(search || statusFilter);

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("");
    };

    const handleCreate =
        async (assignmentData) => {

            try {

                await createAssignment(
                    assignmentData
                );

                setOpenDialog(false);

                reload();

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

                reload();

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

            <ListFilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by employee, email, asset tag, name or serial"
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            >
                <SelectFilter
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={ASSIGNMENT_STATUS_OPTIONS}
                />
            </ListFilterBar>

            <AssignmentTable
                {...tableProps}
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
