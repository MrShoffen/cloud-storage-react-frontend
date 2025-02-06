import {Card, CardContent, CardHeader, Skeleton} from "@mui/material";
import React from "react";


export default function LoadingLocationCard() {
    return (
        <Card sx={{
            minWidth: 100,
            minHeight: 100,
            maxHeight: 230,
            backgroundColor: "modal",
        }}
              elevation={3}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40}/>
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{marginBottom: 6}}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={9} width="40%"/>
                }
            />



        </Card>
    );
}