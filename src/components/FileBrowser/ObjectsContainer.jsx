import {Box, Button} from "@mui/material";
import StorageTileObject from "./StorageObject/StorageTileObject.jsx";
import {useStorageNavigation} from "../../context/Storage/StorageNavigationProvider.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef} from "react";
import StorageListObject from "./StorageObject/StorageListObject.jsx";
import './selected.css';
import {FileSelection} from "../Selection/FileSelection.jsx";
import {useStorageView} from "../../context/Storage/StorageViewProvider.jsx";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {FileTasksModal} from "../../modals/FileTasksModal/FileTasksModal.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";

export const ObjectsContainer = () => {

    const {folderContent} = useStorageNavigation();
    const {filesView, sortFolder} = useStorageView();
    const {selectedIds, setSelectedIds, setSelectionMode} = useStorageSelection();
    const {deleteObject} = useStorageOperations();

    const animationVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
        exit: {opacity: 0}
    };

    const containerRef = useRef(null);
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);


    const handleKeyDown = (event) => {
        event.stopPropagation();
        if (event.key === "Delete" || event.key === "Del") { // Проверяем, что нажата клавиша Del
            if (selectedIds.length > 0) {
                deleteObject(selectedIds);
                setSelectionMode(false);
                setSelectedIds([]);
            }
        }
    };

    // useEffect(() => {
    //
    //
    //     // Добавляем обработчик события keydown
    //     document.addEventListener("keydown", handleKeyDown);
    //
    //     // Убираем обработчик при размонтировании компонента
    //     return () => {
    //         document.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [selectedIds]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={`${folderContent?.map(item => item.id || item.name).join(",")}`}
                initial="hidden"
                animate="visible"
                variants={animationVariants}
                transition={{duration: 0.2}}
            >

                {
                    (filesView === 'regularTiles' || filesView === 'largeTiles')
                        ?
                        <Box
                            ref={containerRef}
                            className={"elements"}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            sx={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(' + (filesView === 'largeTiles' ? '160px' : '100px') + ',100%), 1fr))',
                                gap: 1,
                                pb: 30,
                                '&:focus': {
                                    outline: 'none', // Убираем стандартный outline
                                    // boxShadow: '0 0 0 2px #3f51b5', // Добавляем тень
                                },
                            }}

                            onScroll={() => {
                                selectoRef.current.checkScroll();
                            }}

                        >
                            {folderContent
                                &&
                                sortFolder(folderContent).map((item) => <StorageTileObject selectedIds={selectedIds}
                                                                                           object={item}
                                                                                           style={filesView}/>)}
                        </Box>
                        :
                        <Box
                            ref={containerRef}
                            className={"elements"}

                            sx={{
                                width: '100%',
                                display: 'grid',
                                gap: 0.8,
                                pb: 30,
                            }}
                        >
                            {folderContent
                                &&
                                sortFolder(folderContent).map((item) => <StorageListObject object={item}
                                                                                           style={filesView}
                                                                                           selectedIds={selectedIds}/>)}
                        </Box>
                }

                <FileSelection containerRef={containerRef} selectedIds={selectedIds} moveableRef={moveableRef}
                               selectoRef={selectoRef}
                               setSelectedIds={setSelectedIds}/>
            </motion.div>

        </AnimatePresence>
    )


}