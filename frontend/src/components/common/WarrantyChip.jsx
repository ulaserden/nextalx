import {
    Chip
} from "@mui/material";

function describe(
    status,
    daysRemaining
) {

    if (status === "EXPIRED") {

        const daysAgo = -daysRemaining;

        return {
            color: "error",
            label: daysAgo === 1
                ? "Expired yesterday"
                : `Expired ${daysAgo} days ago`
        };
    }

    if (status === "EXPIRING") {

        return {
            color: "warning",
            label: daysRemaining === 0
                ? "Expires today"
                : daysRemaining === 1
                    ? "1 day left"
                    : `${daysRemaining} days left`
        };
    }

    return null;
}

// Coloured badge for an asset's warranty state as reported by the API
// (warrantyStatus / warrantyDaysRemaining). Renders nothing for VALID or
// untracked warranties.
function WarrantyChip({
    status,
    daysRemaining
}) {

    const chip =
        describe(
            status,
            daysRemaining
        );

    if (!chip) {
        return null;
    }

    return (
        <Chip
            size="small"
            variant="outlined"
            color={chip.color}
            label={chip.label}
        />
    );
}

export default WarrantyChip;
