import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import {useLongPress} from "../../Selection/hook/useLongPress.jsx";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function StorageTileObject({object, style, selectedIds, copyingIds}) {
    const isMob = isMobile;

    const isLarge = style === 'largeTiles'

    const {goToFolder} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode} = useStorageSelection();


    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode) {
            goToFolder(object.name);
        }
    } : () => {
    }

    const onDoubleClick = !isMob ? () => {
        if (object.folder && !copied) {
            goToFolder(object.name);
        }
    } : () => {
    };

    const onLongPress = isMob ? () => {
        if (navigator.vibrate)
            navigator.vibrate(100);
        setSelectionMode(true); //here need to disable while copying
    } : () => {
    }

    const longPressEvent = useLongPress(onLongPress, onClick);

    const onDrag = (e) => {
        console.log('dragging');
    }

    const selected = selectedIds.includes(object.path);

    const copied = copyingIds.includes(object.path);

    return (
        <Card
            data-id={object.path}
            className={'selectable'}
            onClick={onClick}
            onDrag={onDrag}

            {...longPressEvent}
            onDoubleClick={onDoubleClick}
            sx={{
                position: 'relative',
                opacity: copied ? 0.5 : 1,
                minWidth: isLarge ? 160 : 100,
                minHeight: isLarge ? 160 : 100,
                maxHeight: isLarge ? 160 : 100,
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
            </Box>
            <ObjectName object={object}/>

        </Card>
    );
}