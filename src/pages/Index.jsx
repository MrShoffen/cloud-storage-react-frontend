import {Card, Container} from "@mui/material";
import {useState} from "react";

export default function Index() {

    const [count, setCount] = useState(0);

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


                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
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