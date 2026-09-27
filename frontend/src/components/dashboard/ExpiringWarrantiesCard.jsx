import {
    Fragment
} from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";

import WarrantyChip
    from "../common/WarrantyChip";

import EntityLink
    from "../common/EntityLink";

// Soonest upcoming warranty expirations, with a link to the full list.
function ExpiringWarrantiesCard({
    assets,
    windowDays,
    onViewAll
}) {

    return (
        <Card
            sx={{
                height: "100%"
            }}
        >
            <CardContent>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mb: 1
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Upcoming warranty expirations
                    </Typography>

                    <Button
                        size="small"
                        onClick={onViewAll}
                    >
                        View all
                    </Button>
                </Box>

                {
                    assets.length === 0
                        ? (
                            <Typography
                                color="text.secondary"
                                sx={{
                                    py: 2
                                }}
                            >
                                No warranties end in the next {windowDays} days.
                            </Typography>
                        )
                        : (
                            <List disablePadding>
                                {
                                    assets.map((asset, index) => (
                                        <Fragment key={asset.id}>

                                            {
                                                index > 0 && (
                                                    <Divider component="li" />
                                                )
                                            }

                                            <ListItem
                                                disableGutters
                                                secondaryAction={
                                                    <WarrantyChip
                                                        status={asset.warrantyStatus}
                                                        daysRemaining={asset.warrantyDaysRemaining}
                                                    />
                                                }
                                            >
                                                <ListItemText
                                                    primary={
                                                        <EntityLink to={`/assets/${asset.id}`}>
                                                            {`${asset.assetTag} · ${asset.name}`}
                                                        </EntityLink>
                                                    }
                                                    secondary={`${asset.categoryName} · ends ${asset.warrantyEndDate}`}
                                                    sx={{
                                                        pr: 16
                                                    }}
                                                />
                                            </ListItem>

                                        </Fragment>
                                    ))
                                }
                            </List>
                        )
                }

            </CardContent>
        </Card>
    );
}

export default ExpiringWarrantiesCard;
