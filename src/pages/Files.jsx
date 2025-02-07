import {Box, Breadcrumbs, Button, Card, Chip, Container, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageContext} from "../context/Storage/StorageProvider.jsx";
import LoadingLocationCard from "./LoadingLocationCard.jsx";
import {useEffect} from "react";
import StorageTileObject from "../components/StorageObjects/StorageObject/StorageTileObject.jsx";
import {useLocation} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {CustomBread} from "../components/Breadcrumbs/CustomBread.jsx";
import HomeIcon from '@mui/icons-material/Home';
import {ObjectsContainer} from "../components/StorageObjects/ObjectsContainer.jsx";

export default function Files() {

    const {
        isRootFolder,
        folderContentLoading,
        goToPrevFolder,
        currentFolder,
        loadFolder
    } = useStorageContext();
    const location = useLocation();


    useEffect(() => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/home/, "");
        extracted = extracted.replace("/", "");
        let decodedUrl = decodeURIComponent(extracted);
        loadFolder(decodedUrl);
    }, [])

    return (
        <Container disableGutters sx={{mt: 8, width: '100%'}}>
            <Box sx={{p: 1}}>
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: "modal",
                        width: "100%",
                        boxShadow: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        pt: 1,
                        mb: 1,
                    }}
                >
                    <Box
                        sx={{
                            p: 1,
                            height: "50px",
                            display: "flex",
                            overflowX: "auto",
                            maxWidth: "100%",
                            "&::-webkit-scrollbar": {height: "6px"},
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
                    <Divider/>
                    <Box
                        sx={{
                            p: 1,
                            height: "50px",
                            maxHeight: '50px',
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
                            top: 80,
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

            <Box sx={{p: 1}}>
                {folderContentLoading ? <Typography>Loading</Typography> : <ObjectsContainer/>}
            </Box>
        </Container>
    )
}