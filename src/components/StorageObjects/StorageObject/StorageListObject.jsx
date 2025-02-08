import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";
import {ObjectListName} from "../elements/ObjectListName.jsx";
import {useLongPress} from "../Selection/useLongPress.jsx";
import {isMobile} from "react-device-detect";

const isMob = isMobile;


export default function StorageListObject({object, style, selectedIds}) {

    const {goToFolder, setSelectionMode, isSelectionMode} = useStorageContext();


    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode) {
            goToFolder(object.name);
        }
    } : () => {
    }

    const onDoubleClick = !isMob ? () => {
        if (object.folder) {
            goToFolder(object.name);
        }
    } : null;

    const onLongPress = isMob ? () => {
        if (navigator.vibrate)
            navigator.vibrate(70);
        setSelectionMode(true);
    } : null;

    const longPressEvent = useLongPress(onLongPress, onClick);




    return (
        <Card
            data-id={object.path}
            className={'selectable'}
            onDoubleClick={onDoubleClick}

            {...longPressEvent}
            onClick={onClick}

            sx={{
                position: 'relative',
                minWidth: 20,
                minHeight: 40,
                boxShadow: 0,
                backgroundColor: selectedIds.includes(object.path) ? "divider" : "modal",
                border: '1px solid',
                borderColor: "divider",
                borderRadius: 2,
                display: 'flex',         // Добавляем flex-контейнер
                alignItems: 'center',    // Выравниваем по вертикали
                paddingLeft: 4,          // Немного отступа от края
            }}
            elevation={0}
        >
            <Box sx={{position: 'absolute', left: 5, top: 7}}>
                <ObjectIcon object={object} style={style}/>
            </Box>

            <ObjectListName object={object}/>


        </Card>
    );
}