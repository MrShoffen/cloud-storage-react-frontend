import {Box, Card} from "@mui/material";
import React, {useEffect} from "react";

import {ObjectName} from "../elements/ObjectName.jsx";
import {useStorageNavigation} from "../../../context/Storage/StorageNavigationProvider.jsx";
import {useLongPress} from "../../Selection/hook/useLongPress.jsx";
import {isMobile} from "react-device-detect";
import {useStorageSelection} from "../../../context/Storage/StorageSelectionProvider.jsx";
import {FileFormatIcon} from "../../../assets/FileFormatIcon.jsx";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {API_PREVIEW} from "../../../UrlConstants.jsx";
import {sendGetPreview} from "../../../services/fetch/auth/storage/SendGetPreview.js";
import {FilePreview} from "./FilePreview.jsx";


export default function StorageTileObject({object, style, selectedIds, bufferIds, handlePreview}) {
    const isMob = isMobile;
    const isLarge = style === 'largeTiles'
    const {goToFolder} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode, isCutMode, isCopyMode} = useStorageSelection();


    const hiddenFolderTag = object.name === '*empty-folder-tag*'

    const onClick = isMob ? () => {
        if (object.folder && !isSelectionMode && !copied && !cutted) {
            goToFolder(object.name);
            return;
        }
        if (!isSelectionMode) {
            handlePreview(object);
        }
    } : () => {
    }

    const onDoubleClick = !isMob ? () => {
        if (object.folder && !copied && !cutted) {
            goToFolder(object.name);
            return;
        }
        // setPreviewModal(true);
        handlePreview(object);

    } : () => {
    };

    const onLongPress = isMob ? () => {
        // if (navigator.vibrate) {
        //     navigator.vibrate(70);
        // }
        if (!isSelectionMode && !isCutMode && !isCopyMode) {
            setSelectionMode(true);
        }
    } : () => {
    }

    const longPressEvent = useLongPress(onLongPress, onClick);


    const selected = selectedIds.includes(object.path);

    const copied = bufferIds.includes(object.path) && isCopyMode;
    const cutted = bufferIds.includes(object.path) && isCutMode;


    const [preview, setPreview] = React.useState("");
    useEffect(() => {
        if (!preview && object.path && allowedPictureFormat(object)) {
            getPreview(object.path);
        }


    }, []);

    const allowedPictureFormat = (object) => {
        if (object.folder) {
            return false;
        }
        let dotIndex = object.path.lastIndexOf(".");
        let format = object.path.substring(dotIndex + 1);

        return format === 'jpg' || format === 'png'
            || format === 'gif' || format === 'jpeg' || format === 'bmp'
            || format === 'mp4' || format === 'webm' || format === 'mov';

    }

    const getPreview = async (path) => {
        let previewUrl = await sendGetPreview(path);
        // console.log(previewUrl);
        setPreview(previewUrl);

    }


    return (
        <>
            {!hiddenFolderTag &&
                <Card
                    data-id={object.path}
                    className={'selectable'}
                    onClick={onClick}

                    {...longPressEvent}
                    onDoubleClick={onDoubleClick}
                    sx={{
                        position: 'relative',
                        opacity: copied || cutted ? 0.5 : 1,
                        minWidth: isLarge ? 160 : 100,
                        minHeight: isLarge ? 185 : 120,
                        maxHeight: isLarge ? 185 : 120,

                        backgroundColor: selected ? "objectSelected" : "transparent",
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: selected ? "objectSelected" : "objectHover",
                        }
                    }}
                    elevation={0}
                >

                    <Box sx={{width: '100%', height: '80%',
                        position: 'relative',
                        pl: '5px',
                        pr: '5px',
                        pt: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        {preview ?
                            <FilePreview  preview={preview} name={object.name} />
                            :
                            <FileFormatIcon  name={object.name} style={style}/>

                        }
                        {copied && <ContentCopyIcon sx={{position: 'absolute', left: 0, top: 0, transform: 'translate(0%,0%)', zIndex: 40}}/>}
                        {cutted && <ContentCutIcon sx={{position: 'absolute', left: 0, top: 0, transform: 'translate(0%,0%)', zIndex: 40}}/>}

                    </Box>
                    <ObjectName object={object}/>
                </Card>
            }
        </>
    );
}