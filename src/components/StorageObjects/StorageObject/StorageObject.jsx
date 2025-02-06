import {Box, Card, CardContent, CardHeader, Skeleton, Tooltip} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";

import {ObjectName} from "../ObjectName.jsx";
import {ObjectIcon} from "../ObjectIcon.jsx";


export default function StorageObject({object, navigateToFolder}) {

    const onClick = () => {
        if (object.folder) {
            navigateToFolder(object.name);
        }
    }

    return (
        <Card
            onClick={onClick}
            sx={{
                position: 'relative',
                minWidth: 100,
                minHeight: 100,
                boxShadow: 5,
                backgroundColor: "modal",
                border: '1px solid',
                borderColor: "divider",
                borderRadius: 2,
            }}
            elevation={0}
        >
            <Box sx={{width: '100%', position: 'absolute', top: 10}}>
                <ObjectIcon object={object}/>
            </Box>
                <ObjectName object={object}/>

        </Card>
    );
}