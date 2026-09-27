import {
    Chip
} from "@mui/material";

// Colour per status value (asset lifecycle, ACTIVE / INACTIVE records and
// assignments). Unknown values fall back to the neutral chip.
const STATUS_COLORS = {
    AVAILABLE: "success",
    ASSIGNED: "primary",
    IN_REPAIR: "warning",
    BROKEN: "error",
    LOST: "error",
    RETIRED: "default",
    ACTIVE: "success",
    INACTIVE: "default",
    RETURNED: "default"
};

function StatusChip({
    status
}) {

    if (!status) {
        return null;
    }

    return (
        <Chip
            size="small"
            color={STATUS_COLORS[status] || "default"}
            label={status.replace("_", " ")}
        />
    );
}

export default StatusChip;
