import {Card, Container, Fab} from "@mui/material";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {FilePageButton} from "../components/FilePageButton/FilePageButton.jsx";
import {useAuthContext} from "../context/Auth/AuthContext.jsx";
import {UsageHint} from "../components/hints/UsageHint.jsx";

export default function Index() {

    const {auth} = useAuthContext();

    return (
        <Container
            disableGutters
            // maxWidth="md"
            sx={{
                p: 1,
                mt: 8,
                width: '100%',
                // p: { xs: 0, md: 0 }, // Отступы только на десктопе
                // maxWidth: { md: 'md' } // Ограничение ширины на больших экранах
            }}
        >
            {auth.isAuthenticated && <FilePageButton/>}


            <Card
                elevation={0}
                sx={{
                    backgroundColor: "searchInput",
                    width: "100%",
                    boxShadow: 4,
                    borderRadius: 2,
                    p: 2,
                    // Адаптивные отступы внутри карточки
                }}
            >

                <UsageHint/>

            </Card>
        </Container>
    )
}