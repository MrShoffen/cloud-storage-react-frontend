import {FolderIconGrad} from "../../../assets/icons/FolderIconGrad.jsx";
import React from "react";
import {FileIconGrad} from "../../../assets/icons/FileIconGrad.jsx";
import {TextFileIconGrad} from "../../../assets/icons/TextFileIconGrad.jsx";


export const ObjectIcon = ({name, style='regularTiles'}) => {
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
        fontSize: '25px',
    }

    let iconStyle = style === 'regularTiles' ? regularStyle : style === 'largeTiles' ? largeStyle : listStyle;


    if (name.endsWith('/')) {
        return <FolderIconGrad sx={iconStyle}/>
    }

    let dotIndex = name.lastIndexOf(".");
    let format = name.substring(dotIndex+1);


    if (format === 'txt') {
        return <TextFileIconGrad sx={iconStyle}/>
    } else {
        return <FileIconGrad sx={iconStyle}/>
    }
}