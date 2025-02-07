import {Box} from "@mui/material";
import StorageTileObject from "./StorageObject/StorageTileObject.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import {useCustomThemeContext} from "../../context/GlobalThemeContext/CustomThemeProvider.jsx";


export const ObjectsContainer = () => {

    const {folderContent} = useStorageContext();
    const {filesView, turnRegularTiles, turnLargeTiles} = useCustomThemeContext();


    turnLargeTiles();
    // turnRegularTiles();
    if (filesView === 'regularTiles') {

        return (
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
                        .map((item) => <StorageTileObject object={item} style={filesView}/>)}
            </Box>
        )
    } else if (filesView === 'largeTiles') {
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))',
                    gap: 1,
                    pb: 5,
                    // transform: isVisible ? "translateY(0)" : "translateY(-65px)",
                    transition: "transform 0.3s linear",
                }}
            >
                {folderContent
                    && folderContent
                        .map((item) => <StorageTileObject object={item} style={filesView}/>)}
            </Box>
        )
    }

}