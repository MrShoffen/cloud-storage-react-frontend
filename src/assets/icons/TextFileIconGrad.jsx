import DescriptionIcon from '@mui/icons-material/Description';
import React from "react";

export const TextFileIconGrad = (props) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="linearColors3" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="rgba(16,113,175,1)"/>
                <stop offset={1} stopColor="rgba(28,73,163,1)"/>
            </linearGradient>
        </svg>
        <DescriptionIcon
            {...props}
            sx={{
                fill: "url(#linearColors3)",
                ...props.sx
            }}
        />
    </>
)