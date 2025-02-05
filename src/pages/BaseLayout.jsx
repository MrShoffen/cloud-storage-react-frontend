import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import {CssBaseline, Stack, styled} from "@mui/material";



export const BaseLayout = () => {

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}