import {
    Box,
    Typography
} from "@mui/material";

// Label / value pairs laid out in a responsive grid. Empty values show "—".
function InfoGrid({
    items
}) {

    return (
        <Box
            component="dl"
            sx={{
                m: 0,
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                },
                gap: 2.5
            }}
        >
            {
                items.map((item) => (
                    <Box key={item.label}>

                        <Typography
                            component="dt"
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.label}
                        </Typography>

                        <Typography
                            component="dd"
                            sx={{
                                m: 0,
                                mt: 0.5
                            }}
                        >
                            {
                                item.value === null ||
                                item.value === undefined ||
                                item.value === ""
                                    ? "—"
                                    : item.value
                            }
                        </Typography>

                    </Box>
                ))
            }
        </Box>
    );
}

export default InfoGrid;
