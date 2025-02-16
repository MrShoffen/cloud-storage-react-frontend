import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BackgroundWrapper} from "./BackgroundWrapper.jsx";


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
                                '&:not(.MuiLoadingButton-loading):not(.Mui-disabled)': {
                                    '&.MuiButton-contained': {
                                        backgroundImage: isDarkMode ? 'linear-gradient(90deg, rgba(28,73,163,1) 0%, rgba(16,113,175,1) 100%)' : 'linear-gradient(90deg, #2760d3,#1283ca)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
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
                    modal: isDarkMode ? "rgba(0,0,0,0.4)" : "white",
                    objectHover: isDarkMode ? "rgba(45,58,112,0.6)" : "rgba(202,202,202,0.7)",
                    objectSelected: isDarkMode ? "rgba(45,86,197,0.35)" : "rgba(126,126,126,0.7)",
                    selectHeader: isDarkMode ? "rgb(18,18,18)" : "rgb(209,209,209)",
                    background: {
                        default: isDarkMode ? 'black' : 'white',
                    },
                },
            }),
        [isDarkMode]
    );

    const DB_NAME = 'VideoThumbnailsDB';
    const STORE_NAME = 'thumbnails';
    const [db, setDb] = useState(null);

    function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async function initAndCleanDb() {
        let db = await openDB();
        setDb(db);
        await cleanExpiredData(db, 3600000);
    }

    function getFromDB(key) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(key);

            request.onsuccess = () => {
                const data = request.result;
                if (!data) {
                    resolve(null); // Данных нет
                    return;
                }
                resolve(data.value);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    function saveToDB(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const dataWithTimestamp = {
                value: value,
                timestamp: Date.now(), // Текущее время в миллисекундах
            };

            const request = store.put(dataWithTimestamp, key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }


    async function cleanExpiredData(db, ttl) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const currentTime = Date.now();
                const expiredKeys = [];

                request.result.forEach((item) => {
                    const dataAge = currentTime - item.timestamp;
                    if (dataAge > ttl) {
                        expiredKeys.push(item.key);
                    }
                });

                // Удаляем все устаревшие данные
                if (expiredKeys.length > 0) {
                    expiredKeys.forEach((key) => {
                        store.delete(key);
                    });
                }

                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    useEffect(() => {
        initAndCleanDb();

        setInterval(async () => {
            const db = await openDB();
            await cleanExpiredData(db, 3600000);
        }, 1200000);
    }, []);


    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme, getFromDB, saveToDB}}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <BackgroundWrapper>
                    {children}
                </BackgroundWrapper>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}