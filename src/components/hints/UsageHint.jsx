import {Box, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import selection from "../../assets/help/selection.mp4";
import head from "../../assets/help/header.jpg";
import combo from "../../assets/help/combo.jpg";
import view from "../../assets/help/view.mp4";
import {API_PREVIEW} from "../../UrlConstants.jsx";
import ReactPlayer from "react-player";


export const UsageHint = () => {


    return (
        <Box sx={{maxWidth: '640px', margin: 'auto'}}>
            <Typography variant="subtitle1"
                        sx={{width: '100%', textAlign: 'center', mb: 2, fontSize: '18px'}}>
                Перетащите файлы сюда для загрузки.
            </Typography>

            <Typography sx={{width: '100%', textAlign: 'center', mt: 4, mb: -3, fontSize: '18px'}}>
                Так же файлы можно перетаскивать между папками в самом хранилище, выделять и делать операции
                над группами файлов или папок
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <video width="640" height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                    <source src={selection} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>

                <ReactPlayer
                    url={API_PREVIEW + '5/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20250214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250214T180250Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4bf43635d6164c7cf51c47deb3a186a83a03f383b020bada2ed92a3b7a94871a'} // Ссылка на видео
                    controls={true} // Включить элементы управления (пауза, громкость и т.д.)
                    width="100%"   // Ширина плеера
                    height="auto"  // Высота плеера (автоматическая)
                />
            </Box>

            <Divider sx={{ml: -10, mr: -10}}/>

            <Typography sx={{width: '100%', textAlign: 'center', mt: 4, fontSize: '18px'}}>
                При выделении файлов появляется контекстное меню с основными операциями.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src={head} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
            </Box>

            <Divider sx={{ml: -10, mr: -10, mt: 2}}/>

            <Typography sx={{width: '100%', textAlign: 'center', mt: 4, fontSize: '18px'}}>
                На данной странице работают основные комбинации на клавиатуре для работы с файлами
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src={combo} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
            </Box>

            <Divider sx={{ml: -10, mr: -10, mt: 2}}/>

            <Typography sx={{width: '100%', textAlign: 'center', mt: 4, mb: -5, fontSize: '18px'}}>
                Режим отображения и сортировки можно поменять в меню справа
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <video width="640" height="360" autoPlay loop muted style={{maxWidth: '640px'}}>
                    <source src={view} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>
            </Box>


        </Box>
    )
}