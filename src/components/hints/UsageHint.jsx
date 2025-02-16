import {Box, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import selection from "../../assets/help/selection.mp4";
import drag from "../../assets/help/drag.mp4";
import head from "../../assets/help/header.jpg";
import combo from "../../assets/help/combo.jpg";
import view from "../../assets/help/view.mp4";
import navigation from "../../assets/help/navigation.mp4";
import header from "../../assets/help/header.mp4";
import tasks from "../../assets/help/tasks.mp4";


export const UsageHint = () => {


    return (
        <Box sx={{maxWidth: '640px', margin: 'auto'}}>
            <Typography variant="h4"
                        sx={{width: '100%', textAlign: 'center', mb: 2,}}>
                Загрузка
            </Typography>
            <Typography variant="subtitle1"
                        sx={{width: '100%', textAlign: 'center', mt: 2, mb: 0, fontSize: '18px'}}>
                Перетащите файлы для загрузки.
                Или нажмите кнопку + в правом верхнем углу.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                    <source src={drag} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>
            </Box>
            <Divider sx={{m: 2, ml: -10, mr: -10}}/>


            <Typography variant="h4"
                        sx={{width: '100%', textAlign: 'center', mb: 0,}}>
                Навигация и просмотр
            </Typography>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 2, mb: 0, fontSize: '18px'}}>
                Для перехода между папками и открытия файлов используется двойной клик.
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                    <source src={navigation} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>
            </Box>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 2, fontSize: '18px'}}>
                Не все файлы можно посмотреть прямо на сайте - список поддерживаемых форматов:
                jpg, png, gif, jpeg, bmp,
                mp4, mov, webm
            </Typography>
            <Divider sx={{m: 2,ml: -10, mr: -10}}/>

            <Typography variant="h4"
                        sx={{width: '100%', textAlign: 'center', mb: 0,}}>
                Выделение и изменение файлов
            </Typography>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 2, fontSize: '18px'}}>
                Файлы можно выделять по одному - короткими нажатиями или с помощью зажатия кнопкой мыши для множественного выделения.
                Выделенные файлы можно перемещать в другие папки.
            </Typography>
            <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                <source src={selection} type="video/mp4"/>
                Ваш браузер не поддерживает видео.
            </video>
            <Typography sx={{width: '100%', textAlign: 'center', mt:0, fontSize: '18px'}}>
                После выделения файлов наверху появляется контекстное меню с основными операциями
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 1}}>
                <img src={head} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
            </Box>
            <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px', width: '100%'}}>
                <source src={header} type="video/mp4"/>
                Ваш браузер не поддерживает видео.
            </video>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 4, fontSize: '18px'}}>
                На данной странице работают основные комбинации на клавиатуре для работы с выделенными файлами -
                копировать, вырезать, вставить, удалить (Del)
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src={combo} alt="combo" style={{width: '100%', maxWidth: '640px'}}/>
            </Box>

            <Divider sx={{ml: -10, mr: -10, mt: 2, mb: 2}}/>


            <Typography variant="h4"
                        sx={{width: '100%', textAlign: 'center', mb: 0,}}>
                Отображение
            </Typography>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 1, mb: -5, fontSize: '18px'}}>
                Режим отображения и сортировки можно поменять в меню справа
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px'}}>
                    <source src={view} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>
            </Box>
            <Typography sx={{width: '100%', textAlign: 'center', mt: 0, mb: 0, fontSize: '18px'}}>
                При выполнении операций с файлами - в правом нижнем углу появляется окно
                в котором можно просматривать операции и их статус
            </Typography>
            <video width="640"  playsInline height="360" autoPlay loop muted style={{maxWidth: '640px'}}>
                <source src={tasks} type="video/mp4"/>
                Ваш браузер не поддерживает видео.
            </video>


        </Box>
    )
}