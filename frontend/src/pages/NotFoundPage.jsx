import { Box, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

function NotFoundPage() {

    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 8
            }}
        >
            <Typography
                variant="h2"
                fontWeight={700}
                color="primary"
            >
                404
            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    mb: 3
                }}
            >
                The page you are looking for was not found.
            </Typography>

            <Button
                variant="contained"
                component={Link}
                to="/"
            >
                Back to Dashboard
            </Button>
        </Box>
    );
}

export default NotFoundPage;
