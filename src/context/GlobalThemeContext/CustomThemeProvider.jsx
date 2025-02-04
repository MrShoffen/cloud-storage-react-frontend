import {createContext, useContext, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const ThemeContext = createContext();

export const useCustomThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('isDarkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiIconButton: {
                        styleOverrides: {
                            root: {
                                '&:focus': {outline: 'none'},
                                '&:focus-visible': {boxShadow: 'none'}
                            }
                        }
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                '&:not(.MuiButton-loading)': {
                                    '&.MuiButton-contained': {
                                        backgroundImage: isDarkMode ? 'linear-gradient(90deg, rgba(28,73,163,1) 0%, rgba(16,113,175,1) 100%)' : 'linear-gradient(90deg, #2760d3,#1283ca)',
                                        textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            boxShadow: 'rgba(80, 63, 205, 0.5) 0 1px 20px',
                                        }

                                    },
                                    '&:focus': {outline: 'none'},
                                }
                            }
                        }
                    }
                },

                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                    header: isDarkMode ? "rgba(15, 18, 20, 0.8)" : "rgba(240,240,240,0.5)",
                    searchInput: isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)",
                    menu: isDarkMode ? 'rgba(0,0,0,0.8)' : "white",
                    background: {
                        default: isDarkMode ? 'black' : 'white',
                    },
                },
            }),
        [isDarkMode]
    );

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}