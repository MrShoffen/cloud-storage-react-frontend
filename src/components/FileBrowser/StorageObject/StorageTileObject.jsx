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
import {useStorageOperations} from "../../../context/Files/FileOperationsProvider.jsx";
import {API_DOWNLOAD_FILES, API_FILES_PREVIEW, API_PREVIEW} from "../../../UrlConstants.jsx";
import {sendGetPreview} from "../../../services/fetch/auth/storage/SendGetPreview.js";
import FilePreviewModal from "../../../modals/FilePreviewModal/FilePreviewModal.jsx";

export default function StorageTileObject({object, style, selectedIds, bufferIds, handlePreview}) {
    const isMob = isMobile;
    const isLarge = style === 'largeTiles'
    const {goToFolder} = useStorageNavigation();
    const {setSelectionMode, isSelectionMode, isCutMode, isCopyMode} = useStorageSelection();

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
        if (navigator.vibrate) {
            navigator.vibrate(70);
        }
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
            || format === 'gif' || format === 'jpeg' || format === 'bmp';

    }

    const getPreview = async (path) => {
        let previewUrl = await sendGetPreview(path);
        // console.log(previewUrl);
        setPreview(previewUrl);

    }


    return (
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

                backgroundColor: selected ? "objectSelected" : "transparent",
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: selected ? "objectSelected" : "objectHover",
                }
            }}
            elevation={0}
        >
            <Box sx={{width: '100%', position: 'absolute', top: 8, left: '50%', transform: 'translate(-50%)'}}>
                {preview ? <img alt={""}
                                style={{
                                    height: isLarge ? '150px' : '80px',
                                    position: 'absolute',
                                    transform: 'translate(-50%, 0%)',
                                    left: '50%',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                }}
                                src={API_PREVIEW + preview}
                                onError={() => setPreview("")}
                    />
                    :
                    <FileFormatIcon name={object.name} style={style}/>

                }
                {copied && <ContentCopyIcon/>}
                {cutted && <ContentCutIcon/>}

            </Box>
            <ObjectName object={object}/>
        </Card>
    );
}