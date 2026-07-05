import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563eb"
        },
        secondary: {
            main: "#1e293b"
        },
        background: {
            default: "#f8fafc"
        }
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

export default theme;