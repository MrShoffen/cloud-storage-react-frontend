import {Box, CircularProgress, Container, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageNavigation} from "../context/Storage/StorageNavigationProvider.jsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ObjectsContainer} from "../components/FileBrowser/ObjectsContainer.jsx";
import {FileBrowserHeader} from "../components/FileBrowserHeader/FileBrowserHeader.jsx";
import {SelectHeader} from "../components/Selection/SelectHeader/SelectHeader.jsx";
import {FileTasksModal} from "../modals/FileTasksModal/FileTasksModal.jsx";
import selection from "../assets/help/selection.mp4"
import combo from "../assets/help/combo.jpg"
import head from "../assets/help/header.jpg"
import view from "../assets/help/view.mp4";

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


    return (
        <Box>
            <FileBrowserHeader/>

            <Container disableGutters sx={{mt: 23, width: '100%'}}>
                <Box sx={{p: 1, pt: 1}}>
                    {folderContentLoading ? <LoadingBox/> : <ObjectsContainer/>}

                    {/* Контейнер информации и видео */}
                    <Box sx={{maxWidth: '640px', margin: 'auto'}}>
                        <Typography variant="subtitle1"
                                    sx={{width: '100%', textAlign: 'center', mb: 2, fontSize: '18px'}}>
                            Перетащите файлы сюда для загрузки.
                        </Typography>

                        <Typography sx={{width: '100%', textAlign: 'center', mt: 4, mb: -3, fontSize: '18px'}}>
                            Так же файлы можно перетаскивать между папками в самом хранилище, выделять и делать операции
                            над группами файлов или папок
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <video width="640" height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                            <source src={selection} type="video/mp4"/>
                            Ваш браузер не поддерживает видео.
                        </video>
                        </Box>

                        <Divider sx={{ml: -10, mr: -10}}/>

                        <Typography sx={{width: '100%', textAlign: 'center', mt: 4, fontSize: '18px'}}>
                            При выделении файлов появляется контекстное меню с основными операциями.
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <img src={head} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
                        </Box>

                        <Divider sx={{ml: -10, mr: -10, mt: 2}}/>

                        <Typography sx={{width: '100%', textAlign: 'center', mt: 4, fontSize: '18px'}}>
                            На данной странице работают основные комбинации на клавиатуре для работы с файлами
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <img src={combo} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
                        </Box>

                        <Divider sx={{ml: -10, mr: -10, mt: 2}}/>

                        <Typography sx={{width: '100%', textAlign: 'center', mt: 4,mb: -5, fontSize: '18px'}}>
                            Режим отображения и сортировки можно поменять в меню справа
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <video width="640" height="360" autoPlay loop muted style={{maxWidth: '640px'}}>
                                <source src={view} type="video/mp4"/>
                                Ваш браузер не поддерживает видео.
                            </video>
                        </Box>


                    </Box>
                </Box>
            </Container>

            <FileTasksModal/>
        </Box>
    )
}