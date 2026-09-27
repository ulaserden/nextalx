import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";

import {
    Link as RouterLink
} from "react-router-dom";

import ArrowBackIcon
    from "@mui/icons-material/ArrowBack";

// Back link, title and status badge at the top of a detail page.
function DetailHeader({
    backTo,
    backLabel,
    title,
    subtitle,
    badge
}) {

    return (
        <Box
            sx={{
                mb: 3
            }}
        >
            <Button
                component={RouterLink}
                to={backTo}
                size="small"
                startIcon={<ArrowBackIcon />}
                sx={{
                    mb: 1
                }}
            >
                {backLabel}
            </Button>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color="text.primary"
                >
                    {title}
                </Typography>

                {badge}
            </Stack>

            {
                subtitle && (
                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5
                        }}
                    >
                        {subtitle}
                    </Typography>
                )
            }
        </Box>
    );
}

export default DetailHeader;
