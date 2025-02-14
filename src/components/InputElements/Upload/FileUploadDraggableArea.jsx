import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {API_IMAGE_UPLOAD} from "../../../UrlConstants.jsx";
import {Box, Container} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";

export const FileUploadDraggableArea = ({dragRef, isDragging, setIsDragging}) => {

    const {uploadObjects} = useStorageOperations();


    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    // Обработчик выбора файлов/папок
    const handleInputChange = (e, isFolder) => {
        const newFiles = Array.from(e.target.files);

        if (isFolder) {
            const filesWithPath = newFiles.map((file) => ({
                file,
                path: file.webkitRelativePath,
            }));
            setFiles((prev) => [...prev, ...filesWithPath]);
        } else {
            const filesWithoutPath = newFiles.map((file) => ({
                file,
                path: file.name,
            }));
            setFiles((prev) => [...prev, ...filesWithoutPath]);
        }
    };

    const dragCounter = useRef(0);
    // Обработчик перетаскивания
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current += 1;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        dragCounter.current = 0;

        const droppedItems = Array.from(e.dataTransfer.items);
        console.log(droppedItems);
        const newFiles = [];

        const processItem = async (item) => {
            const entry = item.webkitGetAsEntry();

            if (entry) {
                if (entry.isFile) {
                    const file = await new Promise((resolve) => entry.file(resolve));
                    newFiles.push({
                        file,
                        path: file.name,
                    });
                } else if (entry.isDirectory) {
                    await readDirectory(entry, entry.name);
                }
            }
        };

        const readDirectory = async (dirEntry, basePath) => {
            const reader = dirEntry.createReader();
            const entries = await new Promise((resolve) => reader.readEntries(resolve));

            for (const entry of entries) {
                if (entry.isFile) {
                    const file = await new Promise((resolve) => entry.file(resolve));
                    newFiles.push({
                        file,
                        path: `${basePath}/${file.name}`,
                    });
                } else if (entry.isDirectory) {
                    await readDirectory(entry, `${basePath}/${entry.name}`);
                }
            }
        };

        Promise.all(droppedItems.map((item) => processItem(item)))
            .then(() => {
                // setFiles((prev) => [...prev, ...newFiles]);
                uploadObjects(newFiles);
            });
    }, []);

    // Отправка файлов
    const handleUpload = async () => {
        if (!files.length || isUploading) return;

        const formData = new FormData();
        files.forEach(({file}) => {
            formData.append('image', file);
        });

        try {
            setIsUploading(true);
            const response = await axios.post(API_IMAGE_UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percent);
                },
            });
            console.log('Upload success:', response.data);
            setFiles([]);
            setProgress(0);
        } catch (error) {
            console.log('Upload failed:', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Добавляем обработчики событий на весь документ
    useEffect(() => {
        // dragRef.current.addEventListener('dragover', handleDragOver);
        const node = dragRef.current;
        node.addEventListener('dragenter', handleDragEnter);
        node.addEventListener('dragover', handleDragOver);
        node.addEventListener('dragleave', handleDragLeave);
        node.addEventListener('drop', handleDrop);

    }, [handleDragOver, handleDragLeave, handleDrop]);

    return (
        <>

            {isDragging &&
                <Box
                    sx={{
                        zIndex: 50,
                        p: 2,
                        pt: 10,
                        top: 0,
                        position: 'fixed',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        height: '100%',
                        width: '100%',

                    }}>

                    <Box
                        sx={{
                            color: 'text.secondary',
                            width: '100%',
                            height: '100%',
                            border: '10px dashed',
                            borderColor: 'text.secondary',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            borderRadius: 2,
                        }}>


                        <Typography variant="h2"
                                    sx={{
                                        fontWeight: '400',
                                        position: 'absolute',
                                        textAlign: 'center',
                                        width: '100%',
                                        left: '50%',
                                        top: '250px',
                                        transform: 'translate(-50%, -50%)',
                                        textShadow: '5px 5px 5px rgba(0, 0, 0, 0.55)',
                                    }}
                        >
                            Отпустите, чтобы начать загрузку.
                        </Typography>

                        <Typography variant="h4"
                                    sx={{
                                        fontWeight: '400',
                                        position: 'absolute',
                                        textAlign: 'center',
                                        width: '100%',
                                        left: '50%',
                                        top: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        textShadow: '5px 5px 5px rgba(0, 0, 0, 0.55)',

                                    }}
                        >
                            Максимальный размер для загрузки - 2Гб
                        </Typography>

                        {/*/!* Fullscreen Drop Zone *!/*/}
                        {/*{isDragging && (*/}
                        {/*    <div className="fullscreen-drop-zone">*/}
                        {/*        Перетащите файлы или папки сюда*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/*<div className="input-buttons">*/}
                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        ref={fileInputRef}*/}
                        {/*        multiple*/}
                        {/*        onChange={(e) => handleInputChange(e, false)}*/}
                        {/*        style={{display: 'none'}}*/}
                        {/*    />*/}
                        {/*    <button onClick={() => fileInputRef.current.click()}>*/}
                        {/*        Выбрать файлы*/}
                        {/*    </button>*/}

                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        ref={folderInputRef}*/}
                        {/*        webkitdirectory="true"*/}
                        {/*        directory="true"*/}
                        {/*        onChange={(e) => handleInputChange(e, true)}*/}
                        {/*        style={{display: 'none'}}*/}
                        {/*    />*/}
                        {/*    <button onClick={() => folderInputRef.current.click()}>*/}
                        {/*        Выбрать папку*/}
                        {/*    </button>*/}
                        {/*</div>*/}


                    </Box>
                </Box>
            }

            {/*{files.length > 0 && (*/}
            {/*    <div className="file-list">*/}
            {/*        <h4>Выбранные файлы:</h4>*/}
            {/*        <ul>*/}
            {/*            {files.map((file, index) => (*/}
            {/*                <li key={index}>{file.path}</li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<div className="upload-controls">*/}
            {/*    <button*/}
            {/*        onClick={handleUpload}*/}
            {/*        disabled={!files.length || isUploading}*/}
            {/*    >*/}
            {/*        {isUploading ? 'Идет загрузка...' : 'Начать загрузку'}*/}
            {/*    </button>*/}

            {/*    {isUploading && (*/}
            {/*        <div className="progress-bar">*/}
            {/*            <div*/}
            {/*                className="progress-fill"*/}
            {/*                style={{width: `${progress}%`}}*/}
            {/*            />*/}
            {/*            <span>{progress}%</span>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
};
