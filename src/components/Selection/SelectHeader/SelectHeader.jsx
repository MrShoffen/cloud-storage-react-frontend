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
        //todo add validation
        downloadObjects(selectedIds[0]);
    }

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
                    backgroundColor: 'selectHeader',
                    borderRadius: 2,
                    borderColor: 'action.disabled',
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
                        color: 'text.primary'
                    }}
                >
                    {selectedIds.length === 1 && <InfoOutlinedIcon sx={{fontSize: '25px'}}/>
                        ||
                        selectedIds.length > 1 && <CheckBoxOutlinedIcon sx={{fontSize: '25px'}}/>
                    }
                </IconButton>

                <Typography
                    sx={{
                        width: '50%',
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
                        color: 'text.primary',
                        userSelect: 'none',
                        '&:hover': {
                            cursor: 'default',
                        },
                    }}
                >
                    {selectedIds.length === 1 && pathToName(selectedIds[0])
                        ||
                        selectedIds.length > 1 && (selectedIds.length + ' files')
                    }
                </Typography>


                <IconButton
                    onClick={handleDownload}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 137,
                        width: '35px',
                        height: '35px',
                        color: 'text.primary'
                    }}
                >
                    <DownloadIcon sx={{fontSize: '25px'}}/>
                </IconButton>

                <IconButton
                    onClick={handleDelete}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 112,
                        width: '35px',
                        height: '35px',
                        color: 'text.primary'
                    }}
                >
                    <DeleteIcon sx={{fontSize: '25px'}}/>
                </IconButton>

                <IconButton
                    onClick={startCutting}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 77,
                        width: '35px',
                        height: '35px',
                        color: 'text.primary'
                    }}
                >
                    <ContentCutIcon sx={{fontSize: '25px'}}/>
                </IconButton>

                <IconButton
                    onClick={startCopying}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 42,
                        width: '35px',
                        height: '35px',
                        color: 'text.primary'
                    }}
                >
                    <ContentCopyIcon sx={{fontSize: '25px'}}/>
                </IconButton>


                <IconButton
                    onClick={clearSelectionMode}
                    sx={{
                        position: 'absolute',
                        bottom: 14,
                        right: 7,
                        width: '35px',
                        height: '35px',
                        color: 'text.primary'
                    }}
                >
                    <CloseIcon sx={{fontSize: '30px'}}/>
                </IconButton>
            </Toolbar>
        </Container>


    );
};

