import {Box} from "@mui/material";
import StorageTileObject from "./StorageObject/StorageTileObject.jsx";
import {useStorageNavigation} from "../../context/Storage/StorageNavigationProvider.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {useRef, useState} from "react";
import StorageListObject from "./StorageObject/StorageListObject.jsx";
import './selected.css';
import {FileSelection} from "../Selection/FileSelection.jsx";
import {useStorageView} from "../../context/Storage/StorageViewProvider.jsx";
import {useStorageSelection} from "../../context/Storage/StorageSelectionProvider.jsx";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import RenameModal from "../../modals/FileChange/RenameModal.jsx";

export const ObjectsContainer = () => {

    const {folderContent} = useStorageNavigation();
    const {filesView, sortFolder} = useStorageView();
    const {
        selectedIds, setSelectedIds, setSelectionMode,
        bufferIds,
        startCopying,
        startCutting,
        endCutting,
        endCopying,
    } = useStorageSelection();
    const {deleteObject, pasteObjects} = useStorageOperations();

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

        const key = event.key;

        if (key === "Delete" || key === "Del") {
            if (selectedIds.length > 0) {
                deleteObject(selectedIds);
                setSelectionMode(false);
                setSelectedIds([]);
            }
        }

        if ((event.ctrlKey || event.metaKey) &&( key === "c" || key ==="с" || key ==="C" || key ==="С")) {
            event.preventDefault();
            console.log("Ctrl + C pressed");
            if (selectedIds.length > 0) {
                startCopying();
            }
        }

        if ((event.ctrlKey || event.metaKey) && (key === "x" ||  key === "X" ||  key === "Ч"||  key === "ч")) {
            event.preventDefault();

            if (selectedIds.length > 0) {
                startCutting();
            }
        }

        if ((event.ctrlKey || event.metaKey) && (key === "v" ||  key === "V" ||  key === "м"||  key === "М")) {
            event.preventDefault();

            if (bufferIds.length > 0) {
                pasteObjects();
            }
        }
    };






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
                                    outline: 'none',
                                },
                            }}

                            onScroll={() => {
                                selectoRef.current.checkScroll();
                            }}

                        >
                            {folderContent
                                &&
                                sortFolder(folderContent).map(
                                    (item) => <StorageTileObject selectedIds={selectedIds}
                                                                 bufferIds={bufferIds}
                                                                 object={item}
                                                                 style={filesView}/>)}
                        </Box>
                        :
                        <Box
                            ref={containerRef}
                            className={"elements"}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}

                            sx={{
                                width: '100%',
                                display: 'grid',
                                gap: 0.8,
                                pb: 30,
                                '&:focus': {
                                    outline: 'none',

                                },
                            }}
                        >
                            {folderContent
                                &&
                                sortFolder(folderContent).map(
                                    (item) => <StorageListObject object={item}
                                                                 style={filesView}
                                                                 bufferIds={bufferIds}
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