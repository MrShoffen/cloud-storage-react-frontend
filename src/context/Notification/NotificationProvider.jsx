import React, {createContext, useContext, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {AlertTitle, Slide} from "@mui/material";


const backgroundColors = {
    success: "rgba(70,182,0,0.3)",
    info: "rgba(0,129,255,0.3)",
    error: "rgba(244,67,54,0.3)",
    warning: "rgba(255,136,0,0.3)",
};

const colors = {
    info: "rgba(0,129,255,0.8)",
    error: "rgba(244,67,54,0.8)",
    success: "rgba(70,182,0,0.8)",
    warning: "rgba(255,136,0,0.8)",
}
const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

function SlideTransition(props) {
    // const {windowWidth} = useCustomThemeContext();
    // const isSmall = windowWidth < 1050;
    return <Slide {...props}

                  // direction={isSmall ? "up" : "down"}

    />;
}


export const NotificationProvider = ({children}) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info',
    });


    const showNotification = ({message, severity = 'info', duration = 9000}) => {
        setNotification({
            open: true,
            message,
            severity,
        });

        setTimeout(() => {
            setNotification((prev) => ({...prev, open: false}));
        }, duration);
    };


    const closeNotification = () => {
        setNotification((prev) => ({...prev, open: false}));
    };

    const showWarn = (warning, duration=9000) => {
        showNotification({
            message: warning,
            severity: 'warning',
            duration: duration
        })
    }

    const showInfo = (info, duration=9000) => {
        showNotification({
            message: info,
            severity: 'info',
            duration: duration
        })
    }

    const showSuccess = (success, duration=9000) => {
        showNotification({
            message: success,
            severity: 'success',
            duration: duration
        })
    }

    const showError = (error, duration=9000) => {
        showNotification({
            message: error,
            severity: 'error',
            duration: duration
        })
    }

    return (
        <NotificationContext.Provider value={{showNotification, showWarn, showInfo, showSuccess, showError}}>
            {children}

            <Snackbar
                open={notification.open}
                onClose={closeNotification}
                anchorOrigin={{vertical:'bottom' , horizontal: 'right'}}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    variant='filled'
                    onClose={closeNotification}
                    severity={notification.severity}
                    sx={{
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)', // Для Safari
                        width: '100%',
                        fontSize: '15px',
                        alignItems: 'center',
                        backgroundColor: backgroundColors[notification.severity],
                        border: '2px solid',
                        borderColor: colors[notification.severity],
                        color: 'text.secondary',
                        m: '3px',
                    }}
                >
                    <AlertTitle>{notification.severity.toUpperCase()}</AlertTitle>
                    {notification.message}
                </Alert>

            </Snackbar>
        </NotificationContext.Provider>
    );
};
