import {Divider, ListItemIcon, MenuItem} from "@mui/material";
import {AccountCircle, GitHub, Help, Logout, Settings} from "@mui/icons-material";
import {sendLogout} from "../../../services/fetch/auth/SendLogout.js";
import {useAuthContext} from "../../../context/Auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../../context/Notification/NotificationProvider.jsx";
import {useState} from "react";
import ProfileModal from "../../../modals/ProfileModal/ProfileModal.jsx";


export const accountMenuItems = (openProfileModal, openSecurityModal) => {
    const {logout} = useAuthContext();
    const navigate = useNavigate();
    const {showInfo} = useNotification();

    const handleLogout = async () => {
        try {
            await sendLogout();
            logout();
            setTimeout(() => {
                navigate("/cloud-storage/login");
                showInfo("You've successfully logged out.", 4000);
            }, 400);
        } catch (error) {
            console.log('Unknown error occurred! ');
        }
    }


    return (
        <>
            <MenuItem onClick={openProfileModal}>
                <ListItemIcon>
                    <AccountCircle fontSize="small"/>
                </ListItemIcon> Profile
            </MenuItem>
            <MenuItem onClick={openSecurityModal}>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Security settings
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemIcon>
                    <Help fontSize="small"/>
                </ListItemIcon>
                Help
            </MenuItem>
            <MenuItem
                component="a"
                href="https://github.com/MrShoffen/cloud-storage-rest-api"
                target="_blank"
                rel="noopener noreferrer"
                sx={{'&:hover': {textDecoration: 'none', color: 'inherit',}}}
            >
                <ListItemIcon>
                    <GitHub fontSize="small"/>
                </ListItemIcon>
                Source code
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Logout
            </MenuItem>
        </>
    )
}