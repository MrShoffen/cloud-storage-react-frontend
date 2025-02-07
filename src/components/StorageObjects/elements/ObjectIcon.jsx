import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";
import React from "react";
import {FileIconGrad} from "../../../assets/icons/FileIconGrad.jsx";
import {TextFileIconGrad} from "../../../assets/icons/TextFileIconGrad.jsx";


export const ObjectIcon = ({object, style}) => {
    const regularStyle = {
        width: '100%',
        fontSize: '80px',
    };
    const largeStyle = {
        width: '100%',
        fontSize: '130px',
    };

    const listStyle={
        width: '100%',
        fontSize: '20px',
    }

    let iconStyle = style === 'regularTiles' ? regularStyle : style === 'largeTiles' ? largeStyle : listStyle;


    if (object.folder) {
        return <FolderIconGrad sx={iconStyle}/>
    }

    let dotIndex = object.name.lastIndexOf(".");
    let format = object.name.substring(dotIndex+1);


    if (format === 'txt') {
        return <TextFileIconGrad sx={iconStyle}/>
    } else {
        return <FileIconGrad sx={iconStyle}/>
    }
}