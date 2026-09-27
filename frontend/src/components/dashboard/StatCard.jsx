import {
    Card,
    CardActionArea,
    CardContent,
    Typography
} from "@mui/material";

// `color` tints the value (any palette key, e.g. "warning.main");
// `onClick` makes the whole card a link-like button.
function StatCard({
    title,
    value,
    caption,
    color,
    onClick
}) {

    const content = (
        <CardContent>

            <Typography
                color="text.secondary"
                gutterBottom
            >
                {title}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    color
                }}
            >
                {value}
            </Typography>

            {
                caption && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5
                        }}
                    >
                        {caption}
                    </Typography>
                )
            }

        </CardContent>
    );

    return (
        <Card
            sx={{
                height: "100%"
            }}
        >
            {
                onClick
                    ? (
                        <CardActionArea
                            onClick={onClick}
                            sx={{
                                height: "100%"
                            }}
                        >
                            {content}
                        </CardActionArea>
                    )
                    : content
            }
        </Card>
    );
}

export default StatCard;
