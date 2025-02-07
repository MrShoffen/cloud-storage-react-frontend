import {Box} from "@mui/material";
import StorageObject from "./StorageObject/StorageObject.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";


export const ObjectsContainer = () => {

    const {folderContent} = useStorageContext();

    return(
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
                    .map((item) => <StorageObject object={item}/>)}
        </Box>
    )
}