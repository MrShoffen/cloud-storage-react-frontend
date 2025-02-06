import {Box, Breadcrumbs, Button, Card, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useStorageContext} from "../context/Storage/StorageProvider.jsx";
import LoadingLocationCard from "./LoadingLocationCard.jsx";
import {useEffect} from "react";
import StorageObject from "../components/StorageObjects/StorageObject/StorageObject.jsx";
import {useLocation} from "react-router-dom";

export default function Files() {

    const {
        isRootFolder,
        folderLoading,
        folderPath,
        folderContent,
        goToPrevFolder,
        goToFolder,
        initialFolderLoad
    } = useStorageContext();
    const location = useLocation();


    useEffect(() => {
        let extracted = location.pathname.replace(/^\/cloud-storage\/home/, "");
        extracted = extracted.replace("/","");
        console.log(extracted);
        let decodedUrl = decodeURIComponent(extracted);
        console.log(decodedUrl);
        initialFolderLoad(decodedUrl);
    }, [])


    return (
        <Container
            disableGutters
            disableGutters
            sx={{
                mt: 8,
                width: '100%',
            }}
        >
            <Box sx={{p: 1}}>
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: "modal",
                        width: "100%",
                        boxShadow: 4,
                        borderRadius: 2,
                        p: 2,
                        mb: 1,
                        // Адаптивные отступы внутри карточки
                    }}
                >
                    <Box sx={{display: 'flex',}}>
                        <Typography>Home: </Typography>

                        {folderLoading ? <Typography> Loading</Typography> :

                            <Breadcrumbs>
                                {folderPath.map(item => (
                                    <Typography>{item.slice(0, -1)}</Typography>
                                ))}
                            </Breadcrumbs>
                        }

                    </Box>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: "modal",
                        width: "100%",
                        boxShadow: 4,
                        borderRadius: 2,
                        p: 2,
                        mb: 1,
                        // Адаптивные отступы внутри карточки
                    }}
                >
                    <Button disabled={isRootFolder} onClick={goToPrevFolder} variant='contained'>back</Button>
                </Card>

                {folderLoading ? <Typography>Loading</Typography> :
                    <Box
                        sx={{
                            width: '100%',


                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100px, 100%), 1fr))',
                            gap: 1,
                            pb: 5,
                            // transform: isVisible ? "translateY(0)" : "translateY(-65px)",
                            transition: "transform 0.3s linear",
                        }}
                    >
                        {folderContent
                            && folderContent
                                .map((item) => <StorageObject
                                    object={item}
                                    navigateToFolder={goToFolder}/>)}
                    </Box>
                }

            </Box>
        </Container>
    )
}