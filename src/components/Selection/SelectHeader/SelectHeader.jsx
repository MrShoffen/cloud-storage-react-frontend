import {AppBar, Box, Button, Container, Drawer, Toolbar} from "@mui/material";
import React, {useState} from "react";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";
import MainLabel from "../../Header/MainLabel.jsx";
import {HeaderSearchField} from "../../InputElements/HeaderSearchField.jsx";
import DarkModeSwitcher from "../../Header/DarkModeSwitcher.jsx";
import {Settings} from "../../Header/SettingsMenu/Settings.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export const SelectHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {isSelectionMode, setSelectionMode} = useStorageContext();

    // Условие для открытия/закрытия Drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const clearSelectionMode = () => {
        setSelectionMode(false);
    }

    return (
        <Container
            sx={{
                zIndex: 2000,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                // top: isSelectionMode ? '-6px' : '-70px',
                top:  '-6px',
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
                    color: 'text.disabled'
                }}
            >

                <IconButton
                    onClick={clearSelectionMode}
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 7,
                        width: '25px',
                        height: '25px',
                    }}
                >
                    <CloseIcon sx={{fontSize: '30px'}}/>
                </IconButton>
            </Toolbar>
        </Container>


    );
};

