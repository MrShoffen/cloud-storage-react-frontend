import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import {ObjectListName} from "../elements/ObjectListName.jsx";
import {useLongPress} from "../../Selection/hook/useLongPress.jsx";
import {isMobile} from "react-device-detect";
import CheckIcon from "@mui/icons-material/Check";
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";

const isMob = isMobile;


export default function StorageListObject({object, style, selectedIds}) {

    const {goToFolder} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode} = useStorageSelection();

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


    const selected = selectedIds.includes(object.path);

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
                minHeight: 50,
                backgroundColor: selected ? "objectSelected" : "transparent",
                borderRadius: 2,
                display: 'flex',         // Добавляем flex-контейнер
                alignItems: 'center',    // Выравниваем по вертикали
                paddingLeft: 5,          // Немного отступа от края
                '&:hover': {
                    backgroundColor: selected ? "objectSelected" : "objectHover",
                }
            }}
            elevation={0}
        >
            <Box sx={{position: 'absolute', width: '20px', left: 8, bottom: 5, }}>
                <FileFormatIcon name={object.name} style={style}/>
            </Box>

            <ObjectListName object={object}/>

            {selected &&
                <CheckIcon
                    sx={{
                        position: 'absolute',
                        right: '8px', // Отступ от правого края
                        color: 'primary.dark', // Цвет галочки
                    }}
                />
            }


        </Card>
    );
}