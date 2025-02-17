import {Container, Divider, List, ListItemIcon, ListItemText, MenuItem, Popper, Toolbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RenameModal from "../../../modals/FileChange/RenameModal.jsx";
import {ContentCopy, ContentCut, ContentPaste} from "@mui/icons-material";

const pathToName = (path) => {
    let sep = path.lastIndexOf("/", path.length - 2);
    return path.substring(sep + 1);

}

export const SelectHeader = () => {
    const {deleteObject, downloadObjects, pasteObjects} = useStorageOperations();

    const {
        isSelectionMode,
        setSelectionMode,
        selectedIds,
        setSelectedIds,
        startCutting,
        startCopying,
        isCopyMode,
        isCutMode
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
        setAnchorEl2(null);
    }

    const [modalRenameOpen, setModalRenameOpen] = useState(false);

    function handleRenameClick() {
        setModalRenameOpen(true);
    }

    const handleCloseRenameModal = () => {
        setModalRenameOpen(false);
    };


    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleDeleteContext = () => {
        deleteObject(selectedIds);
        setSelectionMode(false);
        setSelectedIds([]);
        setAnchorEl2(null);
    }

    const handleCopy = () => {
        startCopying();
        setAnchorEl2(null);
    }


    const handleCut = () => {
        startCutting();
        setAnchorEl2(null);
    }

    const handlePaste = () => {
        pasteObjects();
        setAnchorEl2(null);
    }

    const handleClose = (event) => {
        // event.preventDefault(); // Отменяем контекстное меню

        const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY);
        console.log(elementsUnderCursor);
        const cont = elementsUnderCursor.find(elem => elem.classList.contains('MuiPopper-root'));
        if (cont) {
            return;
        }

        // setSelectedIds([]); //todo test it
        setAnchorEl2(null);
    };

    useEffect(() => {

        const handleContextMenu = (event) => {
            event.preventDefault(); // Отменяем контекстное меню

            // Получаем все элементы под курсором
            const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY);
            const cont = elementsUnderCursor.find(elem => elem.classList.contains('MuiContainer-root'));
            if (!cont || event.clientY < 184) {
                return;
            }

            const selectableItem = elementsUnderCursor.find(elem => elem.classList.contains('selectable'));

            if(selectableItem && selectedIds.length == 0){
                setSelectedIds([selectableItem.dataset.id]);
            }

            const anchorElement = document.createElement('div');
            anchorElement.style.position = 'absolute';
            anchorElement.style.left = `${event.clientX}px`;
            anchorElement.style.top = `${event.clientY}px`;
            document.body.appendChild(anchorElement);

            setAnchorEl2(anchorElement);
        };

        document.addEventListener('contextmenu', handleContextMenu, true);
        document.addEventListener('click', handleClose, true);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu, true);
            document.removeEventListener('click', handleClose, true);
        };
    }, [selectedIds]); // Зависимость от selectedIds



    return (
        <Container
            sx={{
                zIndex: 2000,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: isSelectionMode ? '-6px' : '-70px',
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
                    ml: '8px',
                    mr: '8px',
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

            <Popper
                open={anchorEl2 !== null}
                // onClose={handleClose}
                anchorEl={anchorEl2}
                placement='bottom-start'
                // transition
                sx={{
                    backgroundColor: 'background.paper',
                    width: 250,
                    maxWidth: '100%',
                    zIndex: 200,
                    // backgroundColor: 'background.paper'
                }}

            >
                {/*//todo вызов контекстного меню без выделения - сначала выделить.*/}
                <List
                    sx={{
                        width:250,
                        // border: '1px solid',
                        borderRadius: 2,
                        boxShadow: 5,
                        backgroundColor: 'paper',
                        maxWidth: '100%'
                    }}
                >
                    <MenuItem
                        disabled={selectedIds.length === 0 || isCopyMode}
                        onClick={handleCut}
                    >
                        <ListItemIcon>
                            <ContentCut fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Вырезать</ListItemText>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Ctrl+X
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        disabled={selectedIds.length === 0}
                        onClick={handleCopy}
                    >
                        <ListItemIcon>
                            <ContentCopy fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Копировать</ListItemText>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Ctrl+C
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        disabled={!isCopyMode && !isCutMode}
                        onClick={handlePaste}
                    >
                        <ListItemIcon>
                            <ContentPaste fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Вставить</ListItemText>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Ctrl+V
                        </Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                        disabled={selectedIds.length === 0}
                        onClick={handleDeleteContext}
                    >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Удалить</ListItemText>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Del
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        disabled={selectedIds.length !== 1}

                    onClick={handleRenameClick}
                    >
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Переименовать</ListItemText>

                    </MenuItem>
                    <Divider/>
                    <MenuItem
                        disabled={selectedIds.length !== 1}

                        onClick={handleDownload}
                    >
                        <ListItemIcon>
                            <DownloadIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Скачать</ListItemText>

                    </MenuItem>


                </List>
            </Popper>

        </Container>


    );
};

