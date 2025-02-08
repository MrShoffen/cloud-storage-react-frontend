import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";
import {useLongPress} from "../Selection/useLongPress.jsx";
import {isMobile} from "react-device-detect";


export default function StorageTileObject({object, style, selectedIds}) {
    const isMob = isMobile;

    const isLarge = style === 'largeTiles'

    const {goToFolder, isSelectionMode, setSelectionMode} = useStorageContext();

    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode) {
            goToFolder(object.name);
        }
    } : () => {}

    const onDoubleClick =  !isMob ? () => {
        if (object.folder) {
            goToFolder(object.name);
        }
    } : () =>{};

    const onLongPress = isMob ? () => {
        if (navigator.vibrate)
            navigator.vibrate(100);
        setSelectionMode(true);
    } : () => {
    }

    const longPressEvent = useLongPress(onLongPress, onClick);

    return (
        <Card
            data-id={object.path}
            className={'selectable'}
            onClick={onClick}

            {...longPressEvent}
            onDoubleClick={onDoubleClick}
            sx={{
                position: 'relative',
                minWidth: isLarge ? 160 : 100,
                minHeight: isLarge ? 160 : 100,
                maxHeight: isLarge ? 160 : 100,
                boxShadow: 5,
                backgroundColor: selectedIds.includes(object.path) ? "divider" : "modal",
                border: '1px solid',
                borderColor: "divider",
                borderRadius: 2,
            }}
            elevation={0}
        >
            <Box sx={{width: '100%', position: 'absolute', top: 5}}>
                <ObjectIcon object={object} style={style}/>
            </Box>
            <ObjectName object={object}/>

        </Card>
    );
}