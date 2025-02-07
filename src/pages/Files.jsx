import {Box, Breadcrumbs, Button, Card, Chip, Container, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageContext} from "../context/Storage/StorageProvider.jsx";
import LoadingLocationCard from "./LoadingLocationCard.jsx";
import {useEffect} from "react";
import StorageTileObject from "../components/StorageObjects/StorageObject/StorageTileObject.jsx";
import {useLocation} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {CustomBread} from "../components/FileBrowserHeader/Breadcrumbs/CustomBread.jsx";
import HomeIcon from '@mui/icons-material/Home';
import {ObjectsContainer} from "../components/StorageObjects/ObjectsContainer.jsx";
import {FileBrowserHeader} from "../components/FileBrowserHeader/FileBrowserHeader.jsx";

export default function Files() {

    const {folderContentLoading, loadFolder} = useStorageContext();
    const location = useLocation();


    useEffect(() => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/home/, "");
        extracted = extracted.replace("/", "");
        let decodedUrl = decodeURIComponent(extracted);
        loadFolder(decodedUrl);
    }, [])

    return (
        <Box>
            <FileBrowserHeader/>

            <Container disableGutters sx={{mt: 23, width: '100%'}}>
                <Box sx={{p: 1}}>
                    {folderContentLoading ? <Typography>Loading</Typography> : <ObjectsContainer/>}
                </Box>
            </Container>
        </Box>
    )
}