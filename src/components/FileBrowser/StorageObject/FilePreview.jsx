import ReactPlayer from "react-player";
import {Box, CircularProgress} from "@mui/material";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";
import React, {useEffect, useState} from "react";
import {API_PREVIEW} from "../../../UrlConstants.jsx";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CircleIcon from '@mui/icons-material/Circle';
import {useCustomThemeContext} from "../../../context/GlobalThemeContext/CustomThemeProvider.jsx";



function VideoThumbnail({videoUrl}) {
    const [thumbnail, setThumbnail] = useState(null);

    const { getFromDB, saveToDB} = useCustomThemeContext();

    async function fetchThumb() {
        if (!videoUrl) return;

        const cachedThumbnail = await getFromDB(videoUrl);
        if (cachedThumbnail) {
            setThumbnail(cachedThumbnail);
            return;
        }

        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.preload = "metadata";


        video.onloadedmetadata = () => {
            video.currentTime = 1;
        };


        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            let width = video.videoWidth;
            let height = video.videoHeight;
            const ratio = width / height;

            canvas.width = 180;
            canvas.height = 180 / ratio;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const thumbnailData = canvas.toDataURL('image/jpeg');
            setThumbnail(thumbnailData);

            saveToDB(videoUrl, thumbnailData)
                .catch((error) => {
                    console.error('Ошибка при сохранении в IndexedDB:', error);
                });

            video.pause();
            video.src = "";
        };
    }

    useEffect( () => {
         fetchThumb();

    }, [videoUrl]);

    return (
        <div>


            {thumbnail ? (
                <Box sx={{position: 'relative'}}>
                    <img src={thumbnail} alt="Превью видео"
                         style={{
                             maxWidth: '100%',
                             maxHeight: '100%',
                             width: 'auto',
                            // scale: '2',
                             borderRadius: '8px',
                             height: 'auto',
                             objectFit: 'cover',
                             userSelect: 'none',
                             pointerEvents: 'none',
                         }}
                    />
                    {/*<CircleIcon sx={{position: 'absolute', color: 'white', transform: 'translate(-50%,-50%)', left: '50%', top: '50%', fontSize: '45px'}}/>*/}
                    <Box sx={{
                        width: 37,
                        height: 37,
                        border: '1px solid black',
                        borderRadius: '50%',
                        position: 'absolute',
                        backgroundColor: 'black',
                        transform: 'translate(-50%,-50%)',
                        left: '50%',
                        top: '50%',
                    }}>

                        <PlayCircleIcon sx={{
                            position: 'absolute',
                            color: 'white',
                            transform: 'translate(-50%,-50%)',
                            left: '50%',
                            top: '50%',
                            fontSize: '40px'
                        }}/>
                    </Box>
                </Box>

            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export const FilePreview = ({name, preview}) => {

    const dotIndex = name ? name.lastIndexOf(".") : 0;
    const format = name ? name.substring(dotIndex + 1) : 0;

    let src = API_PREVIEW + preview;

    if (format === 'jpg' || format === 'png'
        || format === 'gif' || format === 'jpeg' || format === 'bmp') {
        return (
            <img alt={""}
                 style={{
                     maxWidth: '100%',
                     maxHeight: '100%',
                     width: 'auto',
                     height: 'auto',
                     objectFit: 'contain',
                     userSelect: 'none',
                     pointerEvents: 'none',
                 }}
                 src={src}

            />
        )
    }

    if (format === 'mp4' || format === 'webm' || format === 'mov') {
        return (
            <VideoThumbnail videoUrl={src}/>
        )
    }

    return (
        <Box>
            <FileFormatIcon name={preview} style={"list"}/>
        </Box>
    )

}