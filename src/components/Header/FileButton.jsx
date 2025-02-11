import StorageIcon from '@mui/icons-material/Storage';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const FileButton = () => {

    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            onClick={() => navigate('/cloud-storage/files')}
            sx={{
                display: {xs: 'none', sm: "flex"},
                minWidth: 40,
                width: 40,
                height: 40,
                ml: 2,
                boxShadow: 2,
                marginRight: '8px',
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                color: "text.secondary",
            }}
        >
            <StorageIcon sx={{
                fontSize: '25px',
            }}/>

        </Button>
    )
}