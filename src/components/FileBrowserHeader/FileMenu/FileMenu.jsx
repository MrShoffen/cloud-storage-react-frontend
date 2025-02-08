import {
    Divider,
    Grow,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    SwipeableDrawer
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import RegularTile from "@mui/icons-material/ViewCompact";
import LargeTile from "@mui/icons-material/ViewModule";
import CheckIcon from '@mui/icons-material/Check';
import {useStorageView} from "../../../context/Storage/StorageViewProvider.jsx";

export const FileMenu = ({anchorEl, handleCloseMenu}) => {
    const {
        filesView,
        turnLargeTiles,
        turnRegularTiles,
        turnList,
    } = useStorageView();

    const open = Boolean(anchorEl);

    const getMenuVariant = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                sx={{display: {xs: 'none', md: 'block',},  zIndex: 2}}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            border: '1px solid',
                            borderRadius: 2,
                            borderColor: 'divider',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            backdropFilter: 'blur(9px)',
                            WebkitBackdropFilter: 'blur(9px)',
                            backgroundColor: 'menu',
                            mt: 1.5,
                        }
                    }
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                TransitionComponent={Grow}
            >
                {fileMenu()}
            </Menu>
        )
    }

    const getDrawerVariant = () => {
        return (
            <SwipeableDrawer
                anchor='bottom'
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
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
                        backdropFilter: 'blur(9px)',
                        WebkitBackdropFilter: 'blur(9px)', // Для Safari
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'menu',
                        borderRadius: 2
                    }
                }}
            >
                {fileMenu()}

            </SwipeableDrawer>
        )
    }


    const fileMenu = () => {
        return (
            <>
                <List sx={{ minWidth: '350px'}} disablePadding component="nav" aria-label="main mailbox folders">
                    <ListSubheader id="nested-list-subheader"
                                   sx={{
                                       backgroundColor: 'transparent',
                                       backdropFilter: 'blur(9px)',
                                       WebkitBackdropFilter: 'blur(9px)', // Для Safari
                                       maxHeight: '25px', // Уменьшаем высоту
                                       marginBottom: '20px',
                                       marginTop: '-10px'
                                   }}
                    >
                        View
                    </ListSubheader>
                    <ListItemButton
                        selected={filesView === 'list'}
                        onClick={turnList}
                        sx={{maxHeight: '45px',}}
                    >
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary="List"/>
                        {filesView === 'list' && ( // Условно отображаем галочку
                            <CheckIcon
                                sx={{
                                    position: 'absolute',
                                    right: '16px', // Отступ от правого края
                                    color: 'primary.dark', // Цвет галочки
                                }}
                            />
                        )}
                    </ListItemButton>

                    <ListItemButton
                        selected={filesView === 'regularTiles'}
                        onClick={turnRegularTiles}
                        sx={{maxHeight: '45px',}}
                    >
                        <ListItemIcon>
                            <RegularTile/>
                        </ListItemIcon>
                        <ListItemText primary="Tile"/>
                        {filesView === 'regularTiles' && ( // Условно отображаем галочку
                            <CheckIcon
                                sx={{
                                    position: 'absolute',
                                    right: '16px', // Отступ от правого края
                                    color: 'primary.dark', // Цвет галочки
                                }}
                            />
                        )}

                    </ListItemButton>

                    <ListItemButton
                        selected={filesView === 'largeTiles'}
                        onClick={turnLargeTiles}
                        sx={{maxHeight: '45px',}}
                    >
                        <ListItemIcon>
                            <LargeTile/>
                        </ListItemIcon>
                        <ListItemText primary="Large Tile"/>
                        {filesView === 'largeTiles' && ( // Условно отображаем галочку
                            <CheckIcon
                                sx={{
                                    position: 'absolute',
                                    right: '16px', // Отступ от правого края
                                    color: 'primary.dark', // Цвет галочки
                                }}
                            />
                        )}
                    </ListItemButton>

                </List>
                <Divider sx={{m:1}}/>
                <List component="nav" aria-label="secondary mailbox folder">
                    <ListItemButton
                        // selected={selectedView === 2}
                        // onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemText primary="Trash"/>
                    </ListItemButton>
                    <ListItemButton
                        // selected={selectedView === 3}
                        // onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemText primary="Spam"/>
                    </ListItemButton>
                </List>
            </>
        )
    }

    return (
        <>
            {getMenuVariant()}
            {getDrawerVariant()}
        </>
    )
}