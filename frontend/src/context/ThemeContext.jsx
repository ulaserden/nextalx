import {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect
} from "react";

import {
    ThemeProvider,
    createTheme
} from "@mui/material/styles";

import { CssBaseline } from "@mui/material";

const ThemeContext =
    createContext();

export const useThemeContext =
    () => useContext(
        ThemeContext
    );

export const CustomThemeProvider =
    ({ children }) => {

        const [
            darkMode,
            setDarkMode
        ] = useState(false);

        useEffect(() => {

            const savedTheme =
                localStorage.getItem(
                    "nextalx-theme"
                );

            if (
                savedTheme === "dark"
            ) {
                setDarkMode(
                    true
                );
            }

        }, []);

        const toggleTheme =
            () => {

                const newValue =
                    !darkMode;

                setDarkMode(
                    newValue
                );

                localStorage.setItem(
                    "nextalx-theme",
                    newValue
                        ? "dark"
                        : "light"
                );
            };

        const theme =
            useMemo(
                () =>
                    createTheme({
                        palette: {
                            mode:
                                darkMode
                                    ? "dark"
                                    : "light"
                        }
                    }),
                [darkMode]
            );

        return (
            <ThemeContext.Provider
                value={{
                    darkMode,
                    toggleTheme
                }}
            >
                <ThemeProvider
                    theme={theme}
                >
                    <CssBaseline />

                    {
                        children
                    }

                </ThemeProvider>

            </ThemeContext.Provider>
        );
    };