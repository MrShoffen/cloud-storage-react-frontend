import {Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";


export const ObjectName = ({object}) => {


    return (
        <Tooltip
            title={object.folder ? object.name.slice(0, -1) : object.name}
            placement="bottom"
            arrow
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -14],
                            },
                        },
                    ],
                },
            }}

        >
            <Typography
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: 0,
                    pl: '3px',
                    pr: '3px',
                    color: 'text.secondary',
                    fontSize: '15px',
                    whiteSpace: 'nowrap', // Запрещаем перенос строк
                    overflow: 'hidden', // Скрываем выходящий за пределы текст
                    textOverflow: 'ellipsis', // Добавляем многоточие
                    '&:hover': {
                        cursor: 'default',
                    },
                }}
            >
                {object.folder ? object.name.slice(0, -1) : object.name}
            </Typography>
        </Tooltip>
    )
}