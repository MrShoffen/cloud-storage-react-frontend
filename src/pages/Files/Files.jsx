import {Box, CircularProgress, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageNavigation} from "../../context/Storage/StorageNavigationProvider.jsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ObjectsContainer} from "../../components/StorageObjects/ObjectsContainer.jsx";
import {FileBrowserHeader} from "../../components/FileBrowserHeader/FileBrowserHeader.jsx";
import {SelectHeader} from "../../components/Selection/SelectHeader/SelectHeader.jsx";


const LoadingBox = () => {
    return (
        <Box
            sx={{
                width: '100%',
                pt: 10,
                display: 'flex',
                justifyContent: 'center', // Центрируем по горизонтали
                alignItems: 'center',
            }}
        >
            <CircularProgress/>
        </Box>
    )
}

export default function Files() {

    const {folderContentLoading, loadFolder} = useStorageNavigation();
    const location = useLocation();



    const loadFolderFromPath = () => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/home/, '');
        extracted = extracted.replace('/', '');
        let decodedUrl = decodeURIComponent(extracted);
        loadFolder(decodedUrl);
    };

    // Загружаем папку при монтировании компонента
    useEffect(() => {
        loadFolderFromPath();
    }, []);

    // Отслеживаем изменения в пути (включая нажатие кнопки "Назад")
    useEffect(() => {
        loadFolderFromPath();
    }, [location.pathname]); // Зависимость от location.pathname

    const navigate = useNavigate();


    return (
        <Box>
            <FileBrowserHeader/>

            <Container disableGutters sx={{mt: 23, width: '100%'}}>
                <Box sx={{p: 1, pt: 1}}>
                    {folderContentLoading ? <LoadingBox/> : <ObjectsContainer/>}
                </Box>
            </Container>
        </Box>
    )
}