import {
    Button,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from "@mui/material";

import SearchIcon
    from "@mui/icons-material/Search";

import ClearIcon
    from "@mui/icons-material/Clear";

// Search box plus any number of filter controls (passed as children).
// "Clear filters" appears only while something is filtered.
function ListFilterBar({
    search,
    onSearchChange,
    searchPlaceholder = "Search...",
    hasActiveFilters,
    onClear,
    children
}) {

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                mb: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2
            }}
        >
            <TextField
                size="small"
                value={search}
                placeholder={searchPlaceholder}
                onChange={(event) =>
                    onSearchChange(
                        event.target.value
                    )
                }
                sx={{
                    flex: "1 1 260px"
                }}
                slotProps={{
                    htmlInput: {
                        "aria-label": searchPlaceholder
                    },
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: search ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    aria-label="Clear search"
                                    onClick={() =>
                                        onSearchChange("")
                                    }
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }
                }}
            />

            {children}

            {
                hasActiveFilters && (
                    <Button
                        size="small"
                        onClick={onClear}
                    >
                        Clear filters
                    </Button>
                )
            }
        </Paper>
    );
}

export default ListFilterBar;
