import {
    Box,
    Button,
    Card, CircularProgress,
    Container,
    Divider,
    IconButton,
    List, ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    SwipeableDrawer
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CustomBread} from "./Breadcrumbs/CustomBread.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect, useRef, useState} from "react";
import LargeTile from '@mui/icons-material/ViewModule';
import RegularTile from '@mui/icons-material/ViewCompact';
import ListIcon from '@mui/icons-material/List';
import {FileMenu} from "./FileMenu/FileMenu.jsx";

export const FileBrowserHeader = () => {

    const {
        isRootFolder,
        goToPrevFolder,
        currentFolder,
        folderContentLoading,
    } = useStorageContext();

    function handleBack() {
        goToPrevFolder();
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    }
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const scrollBoxRef = useRef(null);

    useEffect(() => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollLeft = scrollBoxRef.current.scrollWidth;
        }
    }, [currentFolder, folderContentLoading]); // Следим за изменением контента

    return (
        <Container disableGutters
                   sx={{
                       mt: 8,
                       width: '100%',
                       position: 'fixed',
                       transform: 'translateX(-50%)',
                       left: '50%',
                       zIndex: 2,
                   }}
        >
            <Box sx={{p: 1}}>
                <Card elevation={0}
                      sx={{
                          backgroundColor: "header",
                          width: "100%",
                          boxShadow: 4,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(1px)',
                          height: '110px'

                      }}
                >
                    <Box
                        ref={scrollBoxRef}
                        sx={{
                        pl: 1,
                        pr: 1,
                        maxHeight: '51px',
                        height: '51px',
                        display: "flex",
                        overflowX: "auto",
                        maxWidth: "100%",
                        "&::-webkit-scrollbar": {height: "3px"},
                        "&::-webkit-scrollbar-thumb": {backgroundColor: "#888", borderRadius: "3px"},
                        scrollbarWidth: "thin",
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        },
                    }}
                    >
                        {folderContentLoading ?
                            <CircularProgress sx={{mt: 1, ml: 1}} size={30}/> :
                            <CustomBread/>}
                    </Box>

                    <Divider sx={{m: 0}}/>

                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            overflowX: "auto",
                            maxWidth: "100%",
                        }}
                    >
                        {!isRootFolder &&
                            <Button onClick={handleBack} variant='contained' sx={{
                                minHeight: '38px',
                                minWidth: '38px',
                                p: 0,
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%'
                            }}>
                                <ArrowBackIcon/>
                            </Button>
                        }
                        <Box sx={{
                            position: 'absolute',
                            width: "70%",
                            transform: 'translateX(-50%)',
                            left: '50%',
                            bottom: 10,
                        }}>
                            <Typography variant='h5' sx={{
                                width: '100%',
                                // backgroundColor: 'white',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {!folderContentLoading && (currentFolder ? currentFolder.slice(0, -1) : 'Home')}
                            </Typography>
                        </Box>


                        <IconButton onClick={handleOpenMenu} variant='contained' sx={{ml: 'auto'}}>
                            <MoreVertIcon/>
                        </IconButton>

                    </Box>
                </Card>
            </Box>
            <FileMenu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu}/>

        </Container>
    )
}