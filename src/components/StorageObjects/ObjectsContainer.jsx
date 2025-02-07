import {Box} from "@mui/material";
import StorageTileObject from "./StorageObject/StorageTileObject.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import StorageListObject from "./StorageObject/StorageListObject.jsx";


export const ObjectsContainer = () => {

    const {folderContent, filesView, turnRegularTiles, turnLargeTiles} = useStorageContext();

    const animationVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
        exit: {opacity: 0}
    };


    const transitionKey = `${folderContent?.map(item => item.id || item.name).join(",")}`;

    if (filesView === 'regularTiles' || filesView === 'largeTiles') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={transitionKey}
                    initial="hidden"
                    animate="visible"

                    variants={animationVariants}
                    transition={{duration: 0.2}}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(' + (filesView === 'largeTiles' ? '160px' : '100px') + ',100%), 1fr))',
                            gap: 1,
                            pb: 5,
                        }}
                    >
                        {folderContent
                            && folderContent
                                .map((item) => <StorageTileObject object={item} style={filesView}/>)}
                    </Box>
                </motion.div>
            </AnimatePresence>
        )
    } else {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={transitionKey}
                    initial="hidden"
                    animate="visible"
                    exit="exit"

                    variants={animationVariants}
                    transition={{duration: 0.2}}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gap: 0.8,
                            pb: 5,
                        }}
                    >
                        {folderContent
                            && folderContent
                                .map((item) => <StorageListObject object={item} style={filesView}/>)}
                    </Box>
                </motion.div>
            </AnimatePresence>
        )
    }

}