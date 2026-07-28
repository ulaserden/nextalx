import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material";

import {
    DarkMode,
    LightMode,
    Menu as MenuIcon
} from "@mui/icons-material";

import {
    useThemeContext
} from "../../context/ThemeContext";

function Topbar({ onMenuClick }) {

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

                <IconButton
                    color="inherit"
                    edge="start"
                    aria-label="open navigation menu"
                    onClick={onMenuClick}
                    sx={{
                        mr: 1,
                        display: {
                            md: "none"
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    noWrap
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: {
                                xs: "none",
                                sm: "inline"
                            }
                        }}
                    >
                        Enterprise IT Asset Management Platform
                    </Box>

                    <Box
                        component="span"
                        sx={{
                            display: {
                                xs: "inline",
                                sm: "none"
                            }
                        }}
                    >
                        Asset Management
                    </Box>
                </Typography>

                <IconButton
                    color="inherit"
                    aria-label="toggle theme"
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
