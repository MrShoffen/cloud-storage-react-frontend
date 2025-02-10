import {Box, Card, LinearProgress} from "@mui/material";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {ObjectListName} from "../../components/FileBrowser/elements/ObjectListName.jsx";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export const Task = () => {

    return (
        <Card
            // data-id={object.path}
            // className={'selectable'}/**/
            // onDoubleClick={onDoubleClick}


            sx={{
                mb: 1,
                position: 'relative',
                minWidth: 20,
                height: 70,
                backgroundColor: "modal",
                borderRadius: 2,
                border: "1px solid",
                borderColor: 'divider',
                display: 'flex',         // Добавляем flex-контейнер
                alignItems: 'center',    // Выравниваем по вертикали

            }}
            elevation={0}
        >
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    height: 10,
                    width: "78%",
                    top: 3,
                    left: 7
                }}
            >

                <Box sx={{position: 'absolute', width: '15px', left: -1, top: 40,}}>
                    <FileFormatIcon name="asdf/" style="list"/>
                </Box>
                <Typography sx={{
                    width: '100%',
                    left: 18,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                }}>Name sdaf safsa dfsad fsaf sad sdafsad fas f</Typography>
                <Typography sx={{
                    color: 'text.secondary',
                    fontSize: '12px',
                    fontWeight: 400,
                    width: '100%',
                    top: 20,
                    left: 20,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                }}>Name/sdaf/safsa/dfsad/fsaf/sad/s/fs/fsad/fsad/fsfa/sfas/as/sdafsad/fas f</Typography>



                    <Typography sx={{
                        fontSize: '15px',
                        width: '100%',
                        display: 'flex',
                        position: 'absolute',
                        left: 18,
                        top: 36,
                    }}>Move in progress </Typography>

            </Box>
            <LinearProgress sx={{width:'100%', position: 'absolute', height: 5, bottom: 0}}/>


            <IconButton
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 7,
                    backgroundColor: 'success.main',
                    width: '35px',
                    height: '35px',
                    color: 'text.secondary',
                    "&:hover": {
                        backgroundColor: 'success.dark',
                    }
                }}
            >
                <CloseIcon sx={{fontSize: '30px'}}/>
            </IconButton>


        </Card>
    )

}