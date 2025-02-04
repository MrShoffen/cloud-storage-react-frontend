import {CustomThemeProvider} from "./GlobalThemeContext/CustomThemeProvider.jsx";
import {NotificationProvider} from "./Notification/NotificationProvider.jsx";


export const GlobalProvider = ({children}) => {

    return (
        <CustomThemeProvider>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </CustomThemeProvider>
    )
}