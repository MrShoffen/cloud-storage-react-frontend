import {Box, Card, LinearProgress} from "@mui/material";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {ObjectListName} from "../../components/FileBrowser/elements/ObjectListName.jsx";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {extractSimpleName} from "../../services/util/Utils.js";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";


export const Task = ({task}) => {

    const {deleteTask} = useStorageOperations();

    const simpleName = extractSimpleName(task.operation.source);
    const operation = task.operation.type;
    const path = task.operation.source;
    const status = task.status;

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

                <Box sx={{position: 'absolute', width: '15px', left:  -1, top: simpleName.endsWith('/') ? 53 : 20,}}>
                    <FileFormatIcon name={simpleName} style="list"/>
                </Box>
                <Typography sx={{
                    width: '100%',
                    left: 18,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                }}>{simpleName}</Typography>
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
                }}>{path}</Typography>

                {status === "pending" ?
                    <Typography sx={{
                        fontSize: '15px',
                        width: '100%',
                        display: 'flex',
                        position: 'absolute',
                        color: 'warning.main',
                        left: 18,
                        top: 36,
                    }}>In queue
                        for {operation === 'delete' ? "deletion" : (operation === 'move' ? 'moving' : 'copying')}</Typography>

                    :

                    (
                        status === 'completed' ?
                            <Typography sx={{
                                fontSize: '15px',
                                width: '100%',
                                display: 'flex',
                                position: 'absolute',
                                left: 18,
                                top: 36,
                                color: 'success.main'
                            }}>{operation === 'delete' ? "Deletion" :
                                (operation === 'move' ? 'Moving' : 'Copying')} successfully completed</Typography>

                            :

                            <Typography sx={{
                                fontSize: '15px',
                                width: '100%',
                                display: 'flex',
                                position: 'absolute',
                                left: 18,
                                top: 36,
                            }}>{operation === 'delete' ? "Deletion" : (operation === 'move' ? 'Moving' : 'Copying')} in
                                progress...</Typography>
                    )


                }
            </Box>
            {status === "progress" &&
                <LinearProgress sx={{
                    width: '100%', position: 'absolute', height: 5, bottom: 0,
                    backgroundColor: 'transparent', // Убираем стандартный цвет фона
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, rgba(28,50,163,1) 0%, rgba(16,113,195,1) 100%)', // Градиент для прогресса
                    },
                }}/>
            }


            {/*//todo add removing pending tasks*/}
            {status === 'completed' &&
                <IconButton
                    onClick={() => deleteTask(task)}
                    sx={{
                        position: 'absolute',
                        bottom: 18,
                        right: 8,
                        backgroundColor: 'success.main',
                        width: '30px',
                        height: '30px',
                        color: 'text.primary',
                        "&:hover": {
                            backgroundColor: 'success.dark',
                        }
                    }}
                >
                    <CloseIcon sx={{fontSize: '30px'}}/>
                </IconButton>
            }

        </Card>
    )

}