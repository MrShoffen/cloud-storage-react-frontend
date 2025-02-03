import {useCustomThemeContext} from "../../context/GlobalThemeContext/CustomThemeProvider.jsx";
import {useEffect, useState} from "react";
import {IconButton, Tooltip} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

export default function DarkModeSwitcher() {
    const {isDarkMode, toggleTheme} = useCustomThemeContext();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="primary"/>;
    }
    return (
        <Tooltip title="Change theme" variant="outlined">
            <IconButton
                data-screenshot="toggle-mode"
                size="sm"
                sx={{
                    alignSelf: 'center',
                    mr: "6px",
                    color: 'text.secondary',
                }}
                onClick={toggleTheme}
            >
                {isDarkMode ? <DarkModeRoundedIcon sx={{fontSize: '20px', color: 'info.dark'}}/> :
                    <LightModeRoundedIcon sx={{fontSize: '20px', color: 'warning.light'}}/>}
            </IconButton>
        </Tooltip>
    );
}

