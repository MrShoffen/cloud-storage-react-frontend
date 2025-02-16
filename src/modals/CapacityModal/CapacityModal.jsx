import React, {useEffect, useState} from "react";
import {Box, Container, Divider, LinearProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Task} from "./Task.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import bytes from "bytes";

export const CapacityModal = () => {

    const {storageUsed} = useStorageOperations();

    const [showModal, setShowModal] = useState(true);

    const handleArrowClick = () => {
        setShowModal(prev => !prev);
    }

    const bottomPosition = showModal ? "130px" : '50px';


    return (<Container
        sx={{
            zIndex: 3000, position: 'fixed', left: '50%', bottom: bottomPosition, transform: 'translateX(-50%)', // top: isSelectionMode ? '-6px' : '-70px',
            // top: '-6px',
            tabIndex: "-1",
            transition: 'bottom 0.2s ease-in-out', backgroundColor: 'transparent',

        }}
        disableGutters>
        <Box
            sx={{
                position: 'absolute',
                left: 8,
                width: "96%",
                maxWidth: '200px',
                height: "200px",
                backgroundColor: "transparent",
                overflow: 'hidden',
            }}
        >

            <Box
                sx={{
                    position: 'relative', // ml: 'auto',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    border: '1px solid',
                    borderColor: 'gray',
                    width: '60px',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(28,50,163,1)', // Градиент для прогресса
                    height: '60px',
                }}
            >

                <IconButton
                    onClick={handleArrowClick}
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        width: '50px',
                        height: '50px',
                        color: 'rgb(230,230,230)',
                    }}
                >
                    <KeyboardArrowDownIcon
                        sx={{fontSize: '40px',  transform: showModal ? 'none' : 'scaleY(-1)'}}/>
                </IconButton>

            </Box>

            <Box
                sx={{

                    width: '100%',
                    background: 'linear-gradient(180deg, rgba(28,50,163,1) 0%, rgba(16,113,195,1) 100%)', // Градиент для прогресса
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    p: 1,
                    pb: 0,
                    height: '80px',
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'gray',
                    color: 'rgb(230,230,230)',
                }}>
                <LinearProgress variant="determinate"
                                value={storageUsed*100/(2048*1024*1024)}
                                sx={{
                                    width: '100%',

                                    height: 5,
                                    top: 0,
                                    backgroundColor: 'rgba(0,0,0,0.34)', // Убираем стандартный цвет фона
                                    '& .MuiLinearProgress-bar': {
                                        background: 'white',
                                    }
                                }}
                />

                <Typography variant="body2" sx={{mt: 1.5, width: '100%', textAlign: 'center'}}>
                    Занято {bytes(storageUsed)} из 2 GB
                </Typography>

            </Box>


        </Box>
    </Container>);
};