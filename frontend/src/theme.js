import { createTheme } from "@mui/material/styles";

// Single source of truth for the app theme. ThemeContext calls this with the
// active mode so the brand palette, radius and font apply in both light/dark.
const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#2563eb"
            },
            secondary: {
                main: "#1e293b"
            },
            ...(mode === "light"
                ? {
                    background: {
                        default: "#f8fafc"
                    }
                }
                : {})
        },

        shape: {
            borderRadius: 12
        },

        typography: {
            fontFamily: [
                "Inter",
                "Roboto",
                "Arial",
                "sans-serif"
            ].join(",")
        }
    });

export default getTheme;
