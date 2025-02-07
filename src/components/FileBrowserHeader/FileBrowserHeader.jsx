import {Box, Button, Card, Container, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CustomBread} from "./Breadcrumbs/CustomBread.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";


export const FileBrowserHeader = () => {

    const {
        isRootFolder,
        goToPrevFolder,
        currentFolder,
        folderContentLoading,
    } = useStorageContext();

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
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',

                      }}
                >
                    <Box sx={{
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
                            <Typography> Loading</Typography> :
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
                        <Button disabled={isRootFolder} onClick={goToPrevFolder} variant='contained'>back</Button>

                        <Box sx={{
                            position: 'absolute',
                            width: "50%",
                            transform: 'translateX(-50%)',
                            left: '50%',
                            bottom: 5,
                        }}>
                            <Typography variant='h5' sx={{
                                width: '100%',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {currentFolder ? currentFolder.slice(0, -1) : 'Home'}
                            </Typography>
                        </Box>

                    </Box>
                </Card>
            </Box>
        </Container>
    )
}