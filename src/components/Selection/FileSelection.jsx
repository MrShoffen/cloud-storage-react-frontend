import Selecto from "react-selecto";
import Moveable from "react-moveable";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";

export const FileSelection = ({
                                  containerRef,
                                  selectoRef, moveableRef,
                                  selectedIds, setSelectedIds
                              }) => {
    const isMob = isMobile;

    const {moveObjects} = useStorageOperations();


    const {isSelectionMode, setSelectionMode, isCopyMode, isCutMode} = useStorageSelection();

    const [mobileSelecting, setMobileSelecting] = useState(false);

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});

    const handleClick = (event) => {
        if (containerRef.current) {
            const touch = event.touches ? event.touches[0] : event;
            setCoordinates({x: touch.clientX, y: touch.clientY});
        }
    };

    useEffect(() => {
            containerRef.current.addEventListener("touchstart", handleClick);
            containerRef.current.addEventListener("mousedown", handleClick);
        },
        [])

    useEffect(() => {
            if (isMob) {
                if (isSelectionMode) {
                    setMobileSelecting(isSelectionMode);
                } else {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([]);
                    }
                }
            }
        },
        [isSelectionMode])

    useEffect(() => {
            if (isMob && mobileSelecting) {
                const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
                const el = elements.find(elem => elem.classList.contains('selectable'));
                if (el) {
                    if (selectoRef.current) {
                        selectoRef.current.setSelectedTargets([el]);
                        let id = el.dataset.id;
                        setSelectedIds([id]);
                    }
                }
            }
        }
        ,
        [mobileSelecting]
    )

    useEffect(() => {
        setTimeout(() => {
            if (selectedIds.length === 0) {
                isMob && setMobileSelecting(false);
                setSelectionMode(false);
            } else {
                setSelectionMode(true);
            }
        }, 100);

    }, [selectedIds])

    const [iconCoord, setIconCoord] = useState({x: 0, y: 0});
    const iconRef = useRef(null);
    const [showIcon, setShowIcon] = useState(false);

    const shouldSelectFromInside = () => {

        if (selectedIds.length !== 1) {
            return true;
        }

        const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
        const el = elements.find(elem => elem.classList.contains('selectable'));

        if (el) {
            return !selectedIds.includes(el.dataset.id);
        }
    }


    const handleDragEnd = (event) => {
        setShowIcon(false);

        const elements = document.elementsFromPoint(event.clientX, event.clientY);

        const el = elements.find(elem => elem.classList.contains('selectable'));
        if (el) {
            let targetPath = el.dataset.id;

            if (selectedIds.includes(targetPath) || !targetPath.endsWith("/")) {
                return;
            }
            moveObjects(selectedIds, targetPath);
        }
    }

    // const FileUploadForm = () => {
    //     const [files, setFiles] = useState([]);
    //     const [progress, setProgress] = useState(0);
    //     const [isUploading, setIsUploading] = useState(false);
    //     const [isDragging, setIsDragging] = useState(false); // Состояние для отслеживания перетаскивания
    //
    //     const fileInputRef = useRef(null);
    //     const folderInputRef = useRef(null);
    //
    //     // Обработчик выбора файлов/папок
    //     const handleInputChange = (e, isFolder) => {
    //         const newFiles = Array.from(e.target.files);
    //
    //         if (isFolder) {
    //             // Добавляем информацию о пути для каждого файла
    //             const filesWithPath = newFiles.map(file => ({
    //                 file,
    //                 path: file.webkitRelativePath, // сохраняем полный путь
    //             }));
    //
    //             setFiles(prev => [...prev, ...filesWithPath]);
    //         } else {
    //             // Для обычных файлов (без папок)
    //             const filesWithoutPath = newFiles.map(file => ({
    //                 file,
    //                 path: file.name, // используем только имя файла
    //             }));
    //
    //             setFiles(prev => [...prev, ...filesWithoutPath]);
    //         }
    //     };
    //
    //     // Обработчик перетаскивания файлов
    //     const handleDragOver = useCallback((e) => {
    //         e.preventDefault();
    //         setIsDragging(true);
    //     }, []);
    //
    //     const handleDragLeave = useCallback((e) => {
    //         e.preventDefault();
    //         setIsDragging(false);
    //     }, []);
    //
    //     const handleDrop = useCallback((e) => {
    //         e.preventDefault();
    //         setIsDragging(false);
    //
    //         const droppedItems = Array.from(e.dataTransfer.items);
    //
    //         const newFiles = [];
    //         const processItem = async (item) => {
    //             const entry = item.webkitGetAsEntry(); // Получаем Entry (FileEntry или DirectoryEntry)
    //
    //             if (entry) {
    //                 if (entry.isFile) {
    //                     // Если это файл
    //                     const file = await new Promise((resolve) => entry.file(resolve));
    //                     newFiles.push({
    //                         file,
    //                         path: file.name, // Используем имя файла
    //                     });
    //                 } else if (entry.isDirectory) {
    //                     // Если это папка
    //                     await readDirectory(entry, entry.name);
    //                 }
    //             }
    //         };
    //
    //         const readDirectory = async (dirEntry, basePath) => {
    //             const reader = dirEntry.createReader();
    //             const entries = await new Promise((resolve) => reader.readEntries(resolve));
    //
    //             for (const entry of entries) {
    //                 if (entry.isFile) {
    //                     // Если это файл внутри папки
    //                     const file = await new Promise((resolve) => entry.file(resolve));
    //                     newFiles.push({
    //                         file,
    //                         path: `${basePath}/${file.name}`, // Сохраняем относительный путь
    //                     });
    //                 } else if (entry.isDirectory) {
    //                     // Если это вложенная папка
    //                     await readDirectory(entry, `${basePath}/${entry.name}`);
    //                 }
    //             }
    //         };
    //
    //         // Обрабатываем все перетаскиваемые элементы
    //         Promise.all(droppedItems.map((item) => processItem(item))).then(() => {
    //             setFiles((prev) => [...prev, ...newFiles]);
    //         });
    //
    //
    //     }, []);
    //
    //     // Отправка файлов с сохранением структуры папок
    //     const handleUpload = async () => {
    //         if (!files.length || isUploading) return;
    //
    //         const formData = new FormData();
    //
    //         // Добавляем файлы в FormData с учетом их путей
    //         files.forEach(({ file, path }) => {
    //             formData.append('image', file);
    //             // formData.append('paths', path); // отправляем путь как отдельное поле
    //         });
    //
    //         try {
    //             setIsUploading(true);
    //
    //             const response = await axios.post(API_IMAGE_UPLOAD, formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //                 onUploadProgress: progressEvent => {
    //                     const percent = Math.round(
    //                         (progressEvent.loaded * 100) / progressEvent.total
    //                     );
    //                     setProgress(percent);
    //                 },
    //             });
    //
    //             console.log('Upload success:', response.data);
    //             setFiles([]);
    //             setProgress(0);
    //         } catch (error) {
    //             console.log('Upload failed:', error.message);
    //         } finally {
    //             setIsUploading(false);
    //         }
    //     };
    //
    //     return (
    //         <div className="upload-container">
    //             {/* Зона для Drag and Drop */}
    //             <div
    //                 className={`drop-zone ${isDragging ? 'dragging' : ''}`}
    //                 onDragOver={handleDragOver}
    //                 onDragLeave={handleDragLeave}
    //                 onDrop={handleDrop}
    //             >
    //                 Перетащите файлы или папки сюда
    //             </div>
    //
    //             <div className="input-buttons">
    //                 {/* Input для файлов */}
    //                 <input
    //                     type="file"
    //                     ref={fileInputRef}
    //                     multiple
    //                     onChange={(e) => handleInputChange(e, false)}
    //                     style={{ display: 'none' }}
    //                 />
    //                 <button onClick={() => fileInputRef.current.click()}>
    //                     Выбрать файлы
    //                 </button>
    //
    //                 {/* Input для папки */}
    //                 <input
    //                     type="file"
    //                     ref={folderInputRef}
    //                     webkitdirectory="true"
    //                     directory="true"
    //                     onChange={(e) => handleInputChange(e, true)}
    //                     style={{ display: 'none' }}
    //                 />
    //                 <button onClick={() => folderInputRef.current.click()}>
    //                     Выбрать папку
    //                 </button>
    //             </div>
    //
    //             {/* Список выбранных файлов */}
    //             {files.length > 0 && (
    //                 <div className="file-list">
    //                     <h4>Выбранные файлы:</h4>
    //                     <ul>
    //                         {files.map((file, index) => (
    //                             <li key={index}>
    //                                 {file.path}
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             )}
    //
    //             {/* Прогресс и кнопка отправки */}
    //             <div className="upload-controls">
    //                 <button
    //                     onClick={handleUpload}
    //                     disabled={!files.length || isUploading}
    //                 >
    //                     {isUploading ? 'Идет загрузка...' : 'Начать загрузку'}
    //                 </button>
    //
    //                 {isUploading && (
    //                     <div className="progress-bar">
    //                         <div
    //                             className="progress-fill"
    //                             style={{ width: `${progress}%` }}
    //                         />
    //                         <span>{progress}%</span>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // };



    return (
        <>
            {!isCopyMode && !isCutMode &&
                <Selecto
                    ref={selectoRef}
                    selectableTargets={[" .selectable"]}
                    selectByClick={!isMob ? true : (mobileSelecting)}
                    selectFromInside={!isMob ? shouldSelectFromInside() : (mobileSelecting)}
                    continueSelect={!isMob ? false : (mobileSelecting)}
                    hitRate={isMob ? 1000 : 0}
                    dragContainer={".elements"}
                    keyContainer={containerRef.current}

                    onSelect={
                        (e) => {
                            setSelectedIds([]);
                            console.log(e.selected.map(el => el.dataset.id))
                            setSelectedIds(e.selected.map(el => el.dataset.id));
                        }
                    }

                    className={isMob && "custom-selection"}
                />
            }
            <style>
                {`
                   .custom-selection {
                        background-color: transparent; 
                        border-color:transparent; 
                    }
                    
                    .grad-selection {
                    
                    }
                `}
            </style>

            {
                !isMob &&
                <>
                    <Moveable
                        ref={moveableRef}
                        target={selectedIds
                            .map(id => document.querySelector(`[data-id="${id}"]`))
                            .filter(el => el !== null)}
                        draggable={true}
                        onClickGroup={e =>
                            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget)
                        }

                        onRender={(e) => {
                            setShowIcon(true);

                            const x = e.clientX;
                            const y = e.clientY;
                            setIconCoord({x: x, y: y});

                            const objs = e.target.dataset.id;
                            // console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);
                        }}
                        onRenderGroup={e => {
                            setShowIcon(true);
                            const x = e.events[0].clientX;
                            const y = e.events[0].clientY;
                            const objs = e.events.map(e => e.target.dataset.id);
                            setIconCoord({x: x, y: y});

                            // console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);
                        }}


                        onDragGroupEnd={handleDragEnd}
                        onDragEnd={handleDragEnd}
                    />
                    <Box
                        ref={iconRef}
                        sx={{
                            position: "fixed",
                            display: showIcon ? "block" : "none",
                            pointerEvents: 'none',
                            width: "100px",
                            height: "100px",
                            backgroundColor: "divider",
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'text.secondary',
                            opacity: 0.85,
                            zIndex: 1000,
                            transform: 'translate(-50%, -80%)',
                            left: iconCoord.x,
                            top: iconCoord.y,
                        }}
                    >


                        {selectedIds.slice(0, 4).map((id, index) => {
                                return <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        left: index * 6 - 8 + 'px',
                                        top: index * 6 + 2 + 'px',
                                    }}
                                >
                                    <FileFormatIcon name={id}/>
                                </Box>
                            }
                        )}
                        <Box
                            sx={{
                                position: "absolute",
                                left: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                top: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                pl: '5px',
                                pr: '5px',
                                backgroundColor: 'background.paper',
                                userSelect: 'none',
                                border: '1px solid',
                                borderRadius: 1,
                                borderColor: 'text.secondary',
                                color: 'text.secondary',

                            }}
                        >{selectedIds.length}</Box>
                    </Box>
                </>
            }
        </>
    )
}