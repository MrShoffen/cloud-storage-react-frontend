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
                <div>
                    <p className="read-the-docs">
                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsd fsdaf
                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsdfsdaf

                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsdfsdaf

                    </p>

                    <p className="read-the-docs">
                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsdfsdaf
                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf


                        sdfsdfsdaf


                        sdfsdfsdaf


                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsdfsdaf


                        Click on the Vite and React logos to learn more
                        sdfsd f
                        fsdfsdf

                        sdfsdfsdaf

                    </p>

                    <p className="read-the-docs">
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q q q q q q q q q q q q q q
                        q q q q q q q q q q q q q
                        q q q q q q q q q q q q q

                    </p>

                </div>
                <h1>Vite + React</h1>
                <div className="card">


                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf
                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                </p>

                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf
                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf


                    sdfsdfsdaf


                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf


                    Click on the Vite and React logos to learn more
                    sdfsd f
                    fsdfsdf

                    sdfsdfsdaf

                </p>
            </Card>
        </Container>
    )
}