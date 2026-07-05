import {
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";

function Topbar() {

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={1}
        >
            <Toolbar>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1
                    }}
                >
                    Enterprise IT Asset Management Platform
                </Typography>

            </Toolbar>
        </AppBar>
    );
}

export default Topbar;