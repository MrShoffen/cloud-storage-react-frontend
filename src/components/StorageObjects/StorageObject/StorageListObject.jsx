import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";
import {ObjectListName} from "../elements/ObjectListName.jsx";


export default function StorageListObject({object, style}) {

    const {goToFolder} = useStorageContext();
    const onClick = () => {
        if (object.folder) {
            goToFolder(object.name);
        }
    }

    return (
        <Card
            onClick={onClick}
            sx={{
                position: 'relative',
                minWidth: 20,
                minHeight: 40,
                boxShadow: 5,
                backgroundColor: "modal",
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