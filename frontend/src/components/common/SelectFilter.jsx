import {
    MenuItem,
    TextField
} from "@mui/material";

// Dropdown filter whose empty value ("All") means "no filter".
function SelectFilter({
    label,
    value,
    onChange,
    options,
    allLabel = "All"
}) {

    return (
        <TextField
            select
            size="small"
            label={label}
            value={value}
            onChange={(event) =>
                onChange(
                    event.target.value
                )
            }
            sx={{
                minWidth: 170
            }}
        >
            <MenuItem value="">
                {allLabel}
            </MenuItem>

            {
                options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))
            }
        </TextField>
    );
}

export default SelectFilter;
