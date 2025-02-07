import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {ObjectsContainer} from "../../components/StorageObjects/ObjectsContainer.jsx";
import {FileBrowserHeader} from "../../components/FileBrowserHeader/FileBrowserHeader.jsx";
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