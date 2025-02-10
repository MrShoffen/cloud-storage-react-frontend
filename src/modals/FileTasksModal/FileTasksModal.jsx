import React, {useEffect, useState} from "react";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {Box, Container, Divider, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Task} from "./Task.jsx";

const pathToName = (path) => {
    let sep = path.lastIndexOf("/", path.length - 2);
    return path.substring(sep + 1);

}

export const FileTasksModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        isSelectionMode,
        setSelectionMode,
        selectedIds,
        setSelectedIds
    } = useStorageSelection();



    const clearSelectionMode = () => {
        setSelectionMode(false);
        setSelectedIds([]);
    }

    const [showModal, setShowModal] = useState(false);

    const handleArrowClick = () => {
        setShowModal(prev => !prev);
    }

    const bottomPosition = showModal ? "390px" : "50px"

    // useEffect(() => {
    //     if (showModal) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "";
    //     }
    //
    //     // Очистка при размонтировании
    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, [showModal]);

    return (
        <Container
            sx={{
                zIndex: 3000,
                position: 'fixed',
                left: '50%',
                bottom: bottomPosition,
                transform: 'translateX(-50%)',
                // top: isSelectionMode ? '-6px' : '-70px',
                // top: '-6px',
                transition: 'bottom 0.2s ease-in-out',
                backgroundColor: 'transparent',

            }}
            disableGutters>
            <Box
                sx={{
                    position: 'absolute',
                    right: 8,
                    width: "96%",
                    maxWidth: '450px',
                    height: "400px",
                    border: '1px solid',
                    backgroundColor: "menu",
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    overflow: 'hidden',

                    borderRadius: 2,
                    borderColor: 'divider',

                }}
            >

                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        background: 'linear-gradient(324deg, rgba(28,73,163,1) 0%, rgba(121,16,175,1) 79%)',
                        height: '50px',
                    }}
                >
                    <IconButton
                        onClick={clearSelectionMode}
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 7,
                            width: '35px',
                            height: '35px',
                            color: 'rgb(230,230,230)',
                        }}
                    >
                        <CloseIcon sx={{fontSize: '30px'}}/>
                    </IconButton>

                    <IconButton
                        onClick={handleArrowClick}
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 40,
                            width: '35px',
                            height: '35px',
                            color: 'rgb(230,230,230)',
                        }}
                    >
                        <KeyboardArrowDownIcon sx={{fontSize: '40px', transform: showModal ? 'none' : 'scaleY(-1)'}}/>
                    </IconButton>

                    <Typography
                        sx={{
                            textAlign: 'left',
                            position: 'absolute',
                            bottom: 8,
                            pointerEvents: 'none',
                            left: 10,
                            fontSize: '18px',
                            color: 'rgb(230,230,230)',
                            userSelect: 'none',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        Tasks
                    </Typography>
                </Box>
                <Divider/>
                <Box
                    sx={{
                        width: '100%',

                        p: 1,
                        pb: 0,
                        height: '340px',
                        overflowY: 'auto',
                    }}>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                </Box>


            </Box>
        </Container>
    );
};