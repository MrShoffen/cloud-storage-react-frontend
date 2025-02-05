import {AppBar, Box, Container, IconButton, Input, Toolbar, Tooltip} from "@mui/material";
import {accountMenuItems} from "./SettingsMenu/AccountMenuItems.jsx";
import {DarkMode} from "@mui/icons-material";
import DarkModeSwitcher from "./DarkModeSwitcher.jsx";
import MainLabel from "./MainLabel.jsx";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import {InputSearch} from "./InputSearch.jsx";
import {authenticationMenuItems} from "./SettingsMenu/AuthenticationMenuItems.jsx";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import {Settings} from "./SettingsMenu/Settings.jsx";


export default function Header() {

    const {auth} = useAuthContext();


    return (
        <AppBar
            component="nav"
            position="fixed"
            elevation={0}
            sx={{
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Для Safari
                borderBottom: "1px solid ",
                backgroundColor: 'header',
                borderColor: 'divider',
                height: "64px",
            }}
        >
            <Container disableGutters>
                <Toolbar sx={{height: "65px",}} disableGutters>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1, height: 1}}/>

                    {auth.isAuthenticated && <InputSearch/>}

                    <DarkModeSwitcher/>

                   <Settings/>

                </Toolbar>
            </Container>
        </AppBar>
    )
};
