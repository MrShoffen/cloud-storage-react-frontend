import {AppBar, Box, Button, Container, Drawer, Toolbar} from "@mui/material";
import React, {useState} from "react";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import MainLabel from "../../Header/MainLabel.jsx";
import {HeaderSearchField} from "../../InputElements/HeaderSearchField.jsx";
import DarkModeSwitcher from "../../Header/DarkModeSwitcher.jsx";
import {Settings} from "../../Header/SettingsMenu/Settings.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from "@mui/material/Typography";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import {sendDownloadFile} from "../../../services/fetch/auth/storage/SendDownloadFIle.js";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RenameModal from "../../../modals/FileChange/RenameModal.jsx";

const pathToName = (path) => {
    let sep = path.lastIndexOf("/", path.length - 2);
    return path.substring(sep + 1);

}

export const SelectHeader = () => {
    const {deleteObject, downloadObjects} = useStorageOperations();

    const {
        isSelectionMode,
        setSelectionMode,
        selectedIds,
        setSelectedIds,
        startCutting,
        startCopying,
    } = useStorageSelection();

    const clearSelectionMode = () => {
        setSelectionMode(false);
        setSelectedIds([]);
    }

    function handleDelete() {
        deleteObject(selectedIds);
        clearSelectionMode();
    }

    async function handleDownload() {
        downloadObjects(selectedIds[0]);
        clearSelectionMode()
    }

    const [modalRenameOpen, setModalRenameOpen] = useState(false);

    function handleRenameClick() {
        setModalRenameOpen(true);
    }

    const handleCloseRenameModal = () => {
        setModalRenameOpen(false);
    };

    return (
        <Container
            sx={{
                zIndex: 2000,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: isSelectionMode ? '-6px' : '-70px',
                // top: '-6px',
                transition: 'top 0.2s ease-in-out',
            }}
            disableGutters>
            <Toolbar
                sx={{
                    height: "70px",
                    border: '1px solid',
                    background: 'linear-gradient(90deg, rgba(28,50,163,1) 0%, rgba(16,113,195,1) 100%)', // Градиент для прогресса

                    borderRadius: 2,
                    borderColor: 'info.dark',
                    ml: '3px',
                    mr: '3px',
                }}
            >


                <IconButton
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        left: 7,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >

                         <CheckBoxOutlinedIcon sx={{fontSize: '20px'}}/>

                </IconButton>

                <Typography
                    sx={{
                        width: '49%',
                        pl: '45px',
                        textAlign: 'left',
                        position: 'absolute',
                        bottom: 17,
                        pointerEvents: 'none',
                        left: 0,
                        fontSize: '18px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'white',
                        userSelect: 'none',
                        '&:hover': {
                            cursor: 'default',
                        },
                    }}
                >

                    {selectedIds.length === 1 ? ('1 file') : (selectedIds.length + ' files')}

                </Typography>


                <IconButton
                    onClick={handleDownload}
                    sx={{
                        display: selectedIds.length === 1 ? 'flex' : 'none',
                        position: 'absolute',
                        bottom: 14,
                        right: 190,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >
                    <DownloadIcon sx={{fontSize: '20px'}}/>
                </IconButton>

                <IconButton
                    onClick={handleRenameClick}
                    sx={{
                        display: selectedIds.length === 1 ? 'flex' : 'none',
                        position: 'absolute',
                        bottom: 14,
                        right: 155,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >
                    <DriveFileRenameOutlineIcon sx={{fontSize: '20px'}}/>
                </IconButton>

                <IconButton
                    onClick={handleDelete}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 120,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >
                    <DeleteIcon sx={{fontSize: '20px'}}/>
                </IconButton>

                <IconButton
                    onClick={startCutting}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 85,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >
                    <ContentCutIcon sx={{fontSize: '20px'}}/>
                </IconButton>

                <IconButton
                    onClick={startCopying}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 48,
                        width: '35px',
                        height: '35px',
                        color: 'white'
                    }}
                >
                    <ContentCopyIcon sx={{fontSize: '20px'}}/>
                </IconButton>


                <IconButton
                    onClick={clearSelectionMode}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 10,
                        width: '30px',
                        height: '30px',
                        color: 'white',
                        backgroundColor: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.dark',
                        }
                    }}
                >
                    <CloseIcon sx={{fontSize: '25px'}}/>
                </IconButton>
            </Toolbar>
            <RenameModal open={modalRenameOpen}
                         onClose={handleCloseRenameModal}
                         selectedIds={selectedIds}
                        clearSelectionMode={clearSelectionMode}/>
        </Container>


    );
};

