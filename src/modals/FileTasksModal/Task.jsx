import {Box, Card, LinearProgress} from "@mui/material";
import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";
import {ObjectListName} from "../../components/FileBrowser/elements/ObjectListName.jsx";
import CheckIcon from "@mui/icons-material/Check";
import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {extractSimpleName} from "../../services/util/Utils.js";
import {useStorageOperations} from "../../context/Files/FileOperationsProvider.jsx";
import {API_DOWNLOAD_FILES} from "../../UrlConstants.jsx";





export const Task = ({task}) => {

    const {deleteTask} = useStorageOperations();

    const simpleName = extractSimpleName(task.operation.source);
    const operation = task.operation.type;
    const path = task.operation.source;
    const status = task.status;
    const message = task.message;






    const sendDownloadFile = async (filePath) => {


        const params = new URLSearchParams({object: filePath});

        const fetchUrl = `${API_DOWNLOAD_FILES}?${params.toString()}`;

        try {
            const response = await fetch(fetchUrl, {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response);

            if (!response.ok) {
                let newVar = await response.json();
                console.log(newVar);
                throw new Error('File download failed');
            }

            const contentLength = response.headers.get('Content-Length');
            const totalSize = contentLength ? parseInt(contentLength, 10) : null;

            let loadedSize = 0;
            const reader = response.body.getReader();
            const chunks = [];


            let count = 0;
            while (true) {
                count++;
                const {done, value} = await reader.read();
                if (done) break;

                chunks.push(value);
                loadedSize += value.length;

                if (totalSize && count === 200) {
                    count = 0;
                    const progress = (loadedSize / totalSize) * 100;
                    console.log(`Download progress: ${progress.toFixed(2)}%`);

                    // Обновите UI с прогрессом загрузки
                }
            }

            const blob = new Blob(chunks);
            console.log('blob');
            console.log(blob);

            const url = window.URL.createObjectURL(blob);
            console.log('url');
            console.log(url);

            const link = document.createElement('a');
            console.log('link');
            console.log(link);

            link.href = url;
            link.setAttribute('download', extractSimpleName(filePath));
            document.body.appendChild(link);
            link.click();

            // Очистка
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            updateTask(task,"completed", "Скачивание завершено")

        } catch (error) {
            console.error('Download error:', error);
            // Обработка ошибки (например, показ уведомления)
        }
    };

    return (
        <Card

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
            {status !== "error" ?

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

                    <Box sx={{position: 'absolute', width: '15px', left: -1, top: simpleName.endsWith('/') ? 53 : 20,}}>
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

                    <Typography sx={{
                        fontSize: '15px',
                        width: '100%',
                        display: 'flex',
                        position: 'absolute',
                        color: status === "completed" ? "success.main" : (status === "pending" ? "warning.main" : "text.primary"),
                        left: 18,
                        top: 36,
                    }}>
                        {message}
                    </Typography>
                </Box>
                :
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
                    <Box sx={{position: 'absolute', width: '15px', left: -1, top: simpleName.endsWith('/') ? 53 : 20,}}>
                        <FileFormatIcon name={simpleName} style="list"/>
                    </Box>
                    <Typography sx={{
                        color: 'error.main',
                        fontSize: '12px',
                        fontWeight: 400,
                        width: '100%',
                        // top: 20,
                        left: 20,
                        position: 'absolute',

                        userSelect: 'none',
                    }}>{message}</Typography>

                </Box>

            }

            {status === "progress"  && operation !== "download" &&
                <LinearProgress sx={{
                    width: '100%', position: 'absolute', height: 5, bottom: 0,
                    backgroundColor: 'transparent', // Убираем стандартный цвет фона
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, rgba(28,50,163,1) 0%, rgba(16,113,195,1) 100%)', // Градиент для прогресса
                    },
                }}/>
            }



            {/*//todo add removing pending tasks*/}
            {(status === 'completed' || status === 'error') &&
                <IconButton
                    onClick={() => deleteTask(task)}
                    sx={{
                        position: 'absolute',
                        bottom: 18,
                        right: 8,
                        backgroundColor: status === 'completed' ? 'success.main' : 'error.main',
                        width: '30px',
                        height: '30px',
                        color: 'text.primary',
                        "&:hover": {
                            backgroundColor: status === 'completed' ? 'success.dark' : 'error.dark',

                        }
                    }}
                >
                    <CloseIcon sx={{fontSize: '30px'}}/>
                </IconButton>
            }

        </Card>
    )

}