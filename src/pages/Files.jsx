import {Card, Container} from "@mui/material";

export default function Files() {

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
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files

                    </p>

                    <p className="read-the-docs">
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files
                        files files files files files


                    </p>
                </div>
            </Card>
        </Container>
    )
}