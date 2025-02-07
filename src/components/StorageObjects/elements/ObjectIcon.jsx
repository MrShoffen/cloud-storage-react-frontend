import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";
import React from "react";
import {FileIconGrad} from "../../../assets/icons/FileIconGrad.jsx";
import {TextFileIconGrad} from "../../../assets/icons/TextFileIconGrad.jsx";


export const ObjectIcon = ({object}) => {
    let style = {
        width: '100%',
        fontSize: '70px',
    };

    if (object.folder) {
        return <FolderIconGrad sx={style}/>
    }

    let dotIndex = object.name.lastIndexOf(".");
    let format = object.name.substring(dotIndex+1);


    if (format === 'txt') {
        return <TextFileIconGrad sx={style}/>
    } else {
        return <FileIconGrad sx={style}/>
    }
}