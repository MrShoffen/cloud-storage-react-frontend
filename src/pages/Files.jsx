import {Box, Breadcrumbs, Button, Card, Chip, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageContext} from "../context/Storage/StorageProvider.jsx";
import LoadingLocationCard from "./LoadingLocationCard.jsx";
import {useEffect} from "react";
import StorageObject from "../components/StorageObjects/StorageObject/StorageObject.jsx";
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
                        borderRadius: 2,
                        pt: 1,
                        pb: 1,
                        mb: 1,
                        // Адаптивные отступы внутри карточки
                    }}
                >
                    <Box
                        sx={{
                            p:1,
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
                </Card>

                <Card elevation={0}
                      sx={{
                          backgroundColor: "modal",
                          width: "100%",
                          boxShadow: 4,
                          borderRadius: 2,
                          p: 2,
                          mb: 1,

                      }}
                >
                    <Button disabled={isRootFolder} onClick={goToPrevFolder} variant='contained'>back</Button>
                </Card>

                {folderContentLoading ? <Typography>Loading</Typography> : <ObjectsContainer/>}

            </Box>
        </Container>
    )
}