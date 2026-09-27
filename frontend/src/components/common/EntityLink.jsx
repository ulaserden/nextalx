import {
    Link
} from "@mui/material";

import {
    Link as RouterLink
} from "react-router-dom";

// In-app link styled like MUI text (used for asset tags / employee names
// that open a detail page).
function EntityLink({
    to,
    children
}) {

    return (
        <Link
            component={RouterLink}
            to={to}
            underline="hover"
        >
            {children}
        </Link>
    );
}

export default EntityLink;
