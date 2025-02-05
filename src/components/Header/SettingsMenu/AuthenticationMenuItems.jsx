import {Divider, ListItemIcon, MenuItem} from "@mui/material";
import {GitHub, Help} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export const authenticationMenuItems = () => {
    const navigate = useNavigate();

    return (
        <>
            <MenuItem onClick={() => {
                navigate("/cloud-storage/login");
                handleClose()
            }}>
                <ListItemIcon>
                    <LoginIcon fontSize="small"/>
                </ListItemIcon> Login
            </MenuItem>
            <MenuItem onClick={() => {
                navigate("/cloud-storage/registration");
                handleClose()
            }}>
                <ListItemIcon>
                    <PersonAddIcon fontSize="small"/>
                </ListItemIcon>
                Registration
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemIcon>
                    <Help fontSize="small"/>
                </ListItemIcon>
                Help
            </MenuItem>
            <MenuItem component="a" href="https://github.com/MrShoffen/cloud-storage-rest-api"
                      target="_blank" rel="noopener noreferrer"
                      sx={{'&:hover': {textDecoration: 'none', color: 'inherit',}}}
            >
                <ListItemIcon>
                    <GitHub fontSize="small"/>
                </ListItemIcon>
                Source code
            </MenuItem>
        </>
    )
}