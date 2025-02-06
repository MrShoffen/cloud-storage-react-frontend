import FolderIcon from "@mui/icons-material/Folder";
import React from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const FileIconGrad = (props) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="rgba(16,113,175,1)"/>
                <stop offset={1} stopColor="rgba(28,73,163,1)"/>
            </linearGradient>
        </svg>
        <InsertDriveFileIcon
            {...props}
            sx={{
                fill: "url(#linearColors)",
                ...props.sx
            }}
        />
    </>
)