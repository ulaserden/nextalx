import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material";

import {
    DarkMode,
    LightMode
} from "@mui/icons-material";

import {
    useThemeContext
} from "../../context/ThemeContext";

function Topbar() {

    const {
        darkMode,
        toggleTheme
    } = useThemeContext();

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

                <IconButton
                    color="inherit"
                    onClick={
                        toggleTheme
                    }
                >
                    {
                        darkMode
                            ? (
                                <LightMode />
                            )
                            : (
                                <DarkMode />
                            )
                    }
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}

export default Topbar;