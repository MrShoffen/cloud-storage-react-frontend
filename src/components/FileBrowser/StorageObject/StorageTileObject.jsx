import {Box, Card} from "@mui/material";
import React from "react";

import {ObjectName} from "../elements/ObjectName.jsx";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import {useLongPress} from "../../Selection/hook/useLongPress.jsx";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";

export default function StorageTileObject({object, style, selectedIds, bufferIds}) {
    const isMob = isMobile;

    const isLarge = style === 'largeTiles'

    const {goToFolder} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode, isCutMode, isCopyMode} = useStorageSelection();
    const {deleteObject, pasteObjects} = useStorageOperations();


    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode && !copied && !cutted) {
            goToFolder(object.name);
        }
    } : () => {
    }

    const onDoubleClick = !isMob ? () => {
        if (object.folder && !copied && !cutted) {
            goToFolder(object.name);
        }
    } : () => {
    };

    const onLongPress = isMob ? () => {
        if (navigator.vibrate) {
            navigator.vibrate(70);
        }
        if (!isSelectionMode && !isCutMode && !isCopyMode) {
            setSelectionMode(true);
        }
    } : () => {
    }

    const longPressEvent = useLongPress(onLongPress, onClick);


    const selected = selectedIds.includes(object.path);

    const copied = bufferIds.includes(object.path) && isCopyMode;
    const cutted = bufferIds.includes(object.path) && isCutMode;


    return (
        <Card
            data-id={object.path}
            className={'selectable'}
            onClick={onClick}

            {...longPressEvent}
            onDoubleClick={onDoubleClick}
            sx={{
                position: 'relative',
                opacity: copied || cutted ? 0.5 : 1,
                minWidth: isLarge ? 160 : 100,
                minHeight: isLarge ? 185 : 110,

                backgroundColor: selected ? "objectSelected" : "transparent",
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: selected ? "objectSelected" : "objectHover",
                }
            }}
            elevation={0}
        >
            <Box sx={{width: '100%', position: 'absolute', top: 8, left: '50%', transform: 'translate(-50%)'}}>
                <FileFormatIcon name={object.name} style={style}/>
                {copied && <ContentCopyIcon/>}
                {cutted && <ContentCutIcon/>}

            </Box>
            <ObjectName object={object}/>

        </Card>
    );
}