import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

function StatCard({
    title,
    value
}) {

    return (
        <Card>
            <CardContent>

                <Typography
                    color="text.secondary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                >
                    {value}
                </Typography>

            </CardContent>
        </Card>
    );
}

export default StatCard;