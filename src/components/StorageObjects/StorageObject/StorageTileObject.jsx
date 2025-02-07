import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../elements/ObjectName.jsx";
import {ObjectIcon} from "../elements/ObjectIcon.jsx";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";


export default function StorageTileObject({object,  style, selectedIds}) {

    const isLarge = style === 'largeTiles'

    const {goToFolder} = useStorageContext();
    const onClick = () => {
        if (object.folder) {
            goToFolder(object.name);
        }
    }

    return (
        <Card
            id={object.path}
            data-id={object.path}
            className={'selectable'}
            onClick={onClick}
            sx={{
                position: 'relative',
                minWidth: isLarge ? 160 : 100,
                minHeight: isLarge ? 160 : 100,
                boxShadow: 5,
                backgroundColor: selectedIds.includes(object.path) ? "white" : "modal",
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