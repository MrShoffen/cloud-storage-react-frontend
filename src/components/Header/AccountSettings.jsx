import {Avatar, Box, Divider, Drawer, IconButton, ListItemIcon, Menu, MenuItem, Slide, Tooltip} from "@mui/material";
import {Logout, PersonAdd, Settings, AccountCircle, Help, GitHub} from "@mui/icons-material";
import {useState} from "react";


export const AccountSettings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const menuItems = () => {

        return (
            <>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small"/>
                    </ListItemIcon> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Security settings
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Help fontSize="small"/>
                    </ListItemIcon>
                    Help
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <GitHub fontSize="small"/>
                    </ListItemIcon>
                    Source code
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </>
        )
    }

    const getMenuVariant = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    zIndex: 2
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            border: '1px solid',
                            borderRadius: 2,
                            borderColor: 'divider',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)', // Для Safari
                            backgroundColor: 'menu',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                TransitionComponent={Slide}
            >
                {menuItems()}
            </Menu>
        )
    }

    const getDrawerVariant = () => {

        return (
            <Drawer
                anchor='right'
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },

                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    // Для Safari
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)', // Для Safari
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'menu',
                        borderRadius: 2
                    }
                }}
            >
                {menuItems()}
            </Drawer>
        )
    }

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{mr: "8px"}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32, fontWeight: "400", fontSize: "17px"}}>Ma</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            {getMenuVariant()}
            {getDrawerVariant()}
        </>
    )
}