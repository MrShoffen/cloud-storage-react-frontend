import Selecto from "react-selecto";
import Moveable from "react-moveable";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Box, Divider, List, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import {ContentCopy, ContentCut, ContentPaste} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export const FileSelection = ({
                                  containerRef,
                                  selectoRef, moveableRef,
                                  selectedIds, setSelectedIds
                              }) => {
    const isMob = isMobile;

    const {moveObjects, deleteObject, } = useStorageOperations();

    const {isSelectionMode, setSelectionMode, isCopyMode, isCutMode, startCopying, startCutting} = useStorageSelection();

    const [mobileSelecting, setMobileSelecting] = useState(false);

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});

    const handleClick = (event) => {
        if (containerRef.current) {
            const touch = event.touches ? event.touches[0] : event;
            setCoordinates({x: touch.clientX, y: touch.clientY});
        }
    };

    const handleDelete = () => {
        deleteObject(selectedIds);
        setSelectionMode(false);
        setSelectedIds([]);
    }


    useEffect(() => {
            containerRef.current.addEventListener("touchstart", handleClick);
            containerRef.current.addEventListener("mousedown", handleClick);
        },
        [])

    useEffect(() => {
            if (isMob) {
                if (isSelectionMode) {
                    setMobileSelecting(isSelectionMode);
                } else {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([]);
                    }
                }
            }
        },
        [isSelectionMode])

    useEffect(() => {
            if (isMob && mobileSelecting) {
                const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
                const el = elements.find(elem => elem.classList.contains('selectable'));
                if (el) {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([el]);
                        let id = el.dataset.id;
                        setSelectedIds([id]);
                    }
                }
            }
        }
        ,
        [mobileSelecting]
    )

    useEffect(() => {
        setTimeout(() => {
            if (selectedIds.length === 0) {
                isMob && setMobileSelecting(false);
                setSelectionMode(false);
            } else {
                setSelectionMode(true);
            }
        }, 100);

    }, [selectedIds])

    const [iconCoord, setIconCoord] = useState({x: 0, y: 0});
    const iconRef = useRef(null);
    const [showIcon, setShowIcon] = useState(false);

    const shouldSelectFromInside = () => {

        if (selectedIds.length !== 1) {
            return true;
        }

        const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
        const el = elements.find(elem => elem.classList.contains('selectable'));

        if (el) {
            return !selectedIds.includes(el.dataset.id);
        }
    }


    const handleDragEnd = (event) => {
        setShowIcon(false);

        const elements = document.elementsFromPoint(event.clientX, event.clientY);

        const el = elements.find(elem => elem.classList.contains('selectable'));
        if (el) {
            let targetPath = el.dataset.id;

            if (selectedIds.includes(targetPath) || !targetPath.endsWith("/")) {
                return;
            }
            moveObjects(selectedIds, targetPath);
        }
    }


    //context

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleOpenContext = (x, y) => {

        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: x + 2,
                    mouseY: y - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    useEffect(() => {

        const container = containerRef.current;

        const handleContextMenu = (event) => {
            event.preventDefault(); // Отменяем контекстное меню

            // Получаем все элементы под курсором
            const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY);
            const cont = elementsUnderCursor.find(elem => elem.classList.contains('MuiContainer-root'));
            if (!cont || event.clientY < 184) {
                return;
            }
            // // Ищем элемент с классом 'selectable'
            // if (el) {
            //     if (selectedIds.length > 0 && selectedIds.includes(el.dataset.id)) {
            handleOpenContext(event.clientX, event.clientY);
            //     }
            // }
        };

        // Добавляем слушатель
        document.addEventListener('contextmenu', handleContextMenu, true);

        // Удаляем слушатель при размонтировании или изменении selectedIds
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu, true);
        };
    }, [selectedIds]); // Зависимость от selectedIds


    return (
        <>
            {!isCopyMode && !isCutMode &&
                <Selecto
                    ref={selectoRef}
                    selectableTargets={[" .selectable"]}
                    selectByClick={!isMob ? true : (mobileSelecting)}
                    selectFromInside={!isMob ? shouldSelectFromInside() : (mobileSelecting)}
                    continueSelect={!isMob ? false : (mobileSelecting)}
                    hitRate={isMob ? 1000 : 0}
                    dragContainer={".elements"}
                    keyContainer={containerRef.current}

                    onSelect={
                        (e) => {
                            setSelectedIds([]);
                            setSelectedIds(e.selected.map(el => el.dataset.id));
                        }
                    }

                    className={isMob && "custom-selection"}
                />
            }
            <style>
                {`
                   .custom-selection {
                        background-color: transparent; 
                        border-color:transparent; 
                    }
                    
                    .grad-selection {
                    
                    }
                `}
            </style>


            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
                sx={{
                    width: 320,
                    maxWidth: '100%',
                    // backgroundColor: 'background.paper'
                }}

            >
                {/*//todo вызов контекстного меню без выделения - сначала выделить.*/}
                <List
                    sx={{width: 320, maxWidth: '100%'}}
                >
                    <MenuItem
                        disabled={selectedIds.length === 0 || isCopyMode}
                        onClick={() => startCutting()}
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
                        onClick={() => startCopying()}
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
                        onClick={handleDelete}
                    >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Удалить</ListItemText>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Del
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Переименовать</ListItemText>

                    </MenuItem>
                </List>
            </Menu>


            {
                !isMob &&
                <>
                    <Moveable
                        ref={moveableRef}
                        clickable={false}
                        target={selectedIds
                            .map(id => document.querySelector(`[data-id="${id}"]`))
                            .filter(el => el !== null)}
                        draggable={true}
                        onClickGroup={e =>
                            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget)
                        }

                        onRender={(e) => {
                            setShowIcon(true);
                            const x = e.clientX;
                            const y = e.clientY;
                            setIconCoord({x: x, y: y});
                        }}
                        onRenderGroup={e => {
                            setShowIcon(true);
                            const x = e.events[0].clientX;
                            const y = e.events[0].clientY;
                            const objs = e.events.map(e => e.target.dataset.id);
                            setIconCoord({x: x, y: y});

                        }}


                        onDragGroupEnd={handleDragEnd}
                        onDragEnd={handleDragEnd}
                    />
                    <Box
                        ref={iconRef}
                        sx={{
                            position: "fixed",
                            display: showIcon ? "block" : "none",
                            pointerEvents: 'none',
                            width: "100px",
                            height: "100px",
                            backgroundColor: "divider",
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'text.secondary',
                            opacity: 0.85,
                            zIndex: 1000,
                            transform: 'translate(-50%, -80%)',
                            left: iconCoord.x,
                            top: iconCoord.y,
                        }}
                    >


                        {selectedIds.slice(0, 4).map((id, index) => {
                                return <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        left: index * 6 - 8 + 'px',
                                        top: index * 6 + 2 + 'px',
                                    }}
                                >
                                    <FileFormatIcon name={id}/>
                                </Box>
                            }
                        )}
                        <Box
                            sx={{
                                position: "absolute",
                                left: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                top: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                pl: '5px',
                                pr: '5px',
                                backgroundColor: 'background.paper',
                                userSelect: 'none',
                                border: '1px solid',
                                borderRadius: 1,
                                borderColor: 'text.secondary',
                                color: 'text.secondary',

                            }}
                        >{selectedIds.length}</Box>
                    </Box>
                </>
            }
        </>
    )
}