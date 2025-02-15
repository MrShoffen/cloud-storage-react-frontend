import {Box, CircularProgress, Container} from "@mui/material";
import {useStorageNavigation} from "../context/Storage/StorageNavigationProvider.jsx";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ObjectsContainer} from "../components/FileBrowser/ObjectsContainer.jsx";
import {FileBrowserHeader} from "../components/FileBrowserHeader/FileBrowserHeader.jsx";
import {FileTasksModal} from "../modals/FileTasksModal/FileTasksModal.jsx";
import * as React from "react";
import {FileUploadDraggableArea} from "../components/InputElements/Upload/FileUploadDraggableArea.jsx";

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

    const {folderContentLoading, loadFolder, folderContent, isRootFolder} = useStorageNavigation();
    const location = useLocation();


    const loadFolderFromPath = () => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/files/, '');
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
    useEffect(() => {
        if ((!folderContent || folderContent.length == 0) && !folderContentLoading && !isRootFolder) {
            setTimeout(() =>
                    navigate(("/cloud-storage/files/"))
                , 500)
        }
    }, [folderContent]); // Зависимость от location.pathname


    const dragRef = useRef();

    const [isDragging, setIsDragging] = useState(false);


    return (
        <Box ref={dragRef} sx={{
            height: '100%',

        }}>

            <FileBrowserHeader/>


            <Container disableGutters sx={{mt: 23, width: '100%'}}>
                <Box sx={{p: 1, pt: 1}}>
                    {folderContentLoading ? <LoadingBox/> : <ObjectsContainer/>}
                </Box>
            </Container>


            <FileUploadDraggableArea dragRef={dragRef}
                                     isDragging={isDragging}
                                     setIsDragging={setIsDragging}/>

            <FileTasksModal/>
        </Box>
    )
}