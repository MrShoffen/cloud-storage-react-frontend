import React, {useEffect} from "react";
import {Box, Modal, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {extractSimpleName, formatDate} from "../../services/util/Utils.js";
import bytes from "bytes";
import {sendGetPreview} from "../../services/fetch/auth/storage/SendGetPreview.js";
import {API_PREVIEW} from "../../UrlConstants.jsx";
import ReactPlayer from "react-player";

import {FileFormatIcon} from "../../assets/FileFormatIcon.jsx";

export default function FilePreviewModal({
                                             open,
                                             onClose,
                                             object
                                         }) {

    const dotIndex = object ? object.path.lastIndexOf(".") : 0;
    const format = object ? object.path.substring(dotIndex + 1) : 0;

    const allowedPreviewFormat = (format) => {

        const allowed = ["jpg", "png", "gif", "jpeg", "bmp",
            "mp4", "mov", "webm"];

        return allowed.includes(format);
    }

    const [preview, setPreview] = React.useState("");
    useEffect(() => {

        if (open  && allowedPreviewFormat(format)) {
            getPreview(object.path);
        }


    }, [open]);


    const getPreview = async (path) => {
        let previewUrl = await sendGetPreview(path);
        setPreview(previewUrl);
    }


    const getContentViewer = (format) => {
        let src = API_PREVIEW + preview;

        if (format === 'jpg' || format === 'png'
            || format === 'gif' || format === 'jpeg' || format === 'bmp') {
            return (
                <img
                    src={src}
                    alt="err"
                    style={{
                        maxWidth: '100%', // Ограничение по ширине
                        maxHeight: '100%', // Ограничение по высоте
                        width: 'auto', // Автоматическая ширина
                        height: 'auto', // Автоматическая высота
                        objectFit: 'contain', // Масштабирование с сохранением пропорций
                    }}
                />
            )
        }

        if (format === 'mp4' || format === 'webm' || format === 'mov') {
            return (
                <ReactPlayer
                    url={src} // Ссылка на видео
                    controls={true} // Включить элементы управления (пауза, громкость и т.д.)
                    // width="100%"   // Ширина плеера
                    height="100%"  // Высота плеера (автоматическая)
                />
            )
        }

        return (
            <Box
                // sx={{}
            >
                <FileFormatIcon name={object.name} style={"list"}/>
            </Box>
        )
    }

    return (
        <Modal  open={open} onClose={onClose} sx={{position: 'fixed', top: 0}}>

                <Card variant="outlined"
                      sx={{
                          display: 'flex',

                          flexDirection: 'column',
                          width: '100%',
                          maxWidth: {md: '800px', xs: '90%'},
                          pl: 2,
                          pr: 2,
                          position: 'fixed',
                          transform: 'translate(-50%, -50%)',
                          left: '50%',
                          top: '50%',
                          height: '500px',

                          margin: 'auto',
                          backgroundColor: "modal",
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: 5,
                          borderRadius: 2,
                          // position: "relative",
                          zIndex: 200
                      }}
                >

                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            width: '25px',
                            height: '25px',
                            zIndex: 200

                        }}
                    >
                        <CloseIcon sx={{fontSize: '25px'}}/>
                    </IconButton>

                    {object &&
                    <>

                    <Box sx={{
                        m: 1,
                        pr: 2,

                        // width: '100%',


                    }}>
                        <Typography
                            sx={{
                                width: '100%',
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >{extractSimpleName(object.path)}</Typography>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '500px',
                        // backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        {open && object && getContentViewer(format)}

                    </Box>

                    <Box sx={{
                        width: '50&',
                        display: 'flex',
                        mt: 1,
                        mb: 1,
                        height: '40px',
                    }}>
                        <Typography
                            sx={{
                                width: '200px',
                                color: 'text.secondary',
                            }}
                        >Размер: {bytes(object.size)}</Typography>
                        <Typography
                            sx={{
                                width: '50%',
                                color: 'text.secondary',
                            }}
                        >Изменен: {formatDate(object.lastModified)}</Typography>

                    </Box>
                    </>
                    }
                </Card>

        </Modal>
    );

};