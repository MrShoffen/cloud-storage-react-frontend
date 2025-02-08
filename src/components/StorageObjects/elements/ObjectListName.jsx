import {Tooltip, Zoom} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import bytes from "bytes";
import {formatDate} from "../../../services/util/DateFormatter.js";


export const ObjectListName = ({object}) => {


    return (
        <>
            <Tooltip
                title={object.folder ? object.name.slice(0, -1) : object.name}
                placement="bottom"
                arrow
                enterDelay={700}

                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, -5],
                                },
                            },
                        ],
                    },
                }}
                slots={{
                    transition: Zoom,
                }}

            >
                <Typography
                    sx={{
                        width: '38%',
                        textAlign: 'left',
                        position: 'absolute',
                        bottom: 7,
                        fontSize: '15px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        userSelect: 'none',
                        '&:hover': {
                            cursor: 'default',
                        },
                    }}
                >
                    {object.folder ? object.name.slice(0, -1) : object.name}
                </Typography>
            </Tooltip>

            {!object.folder &&
                <>
                    {/*<Divider orientation="vertical"*/}
                    {/*         sx={{position: 'absolute', bottom: '4px', height: '30px', left: '44.5%'}}/>*/}
                    <Typography
                        sx={{
                            width: '20%',
                            textAlign: 'left',
                            position: 'absolute',
                            bottom: 8,
                            left: '50%',
                            fontSize: '12px',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        {bytes(object.size, {decimalPlaces: 0})}
                    </Typography>
                    {/*<Divider orientation="vertical"*/}
                    {/*         sx={{position: 'absolute', bottom: '4px', height: '30px', left: '61%'}}/>*/}

                    <Typography
                        sx={{
                            width: '40%',
                            textAlign: 'left',
                            position: 'absolute',
                            bottom: 8,
                            left: '63%',
                            fontSize: '12px',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                                cursor: 'default',
                            },
                        }}
                    >
                        {formatDate(object.lastModified)}
                    </Typography>
                </>
            }

        </>
    )
}