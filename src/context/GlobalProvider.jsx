import {CustomThemeProvider} from "./GlobalThemeContext/CustomThemeProvider.jsx";
import {NotificationProvider} from "./Notification/NotificationProvider.jsx";
import {AuthProvider} from "./Auth/AuthContext.jsx";
import {CloudStorageProvider} from "./Storage/StorageProvider.jsx";

export const GlobalProvider = ({children}) => {

    return (
        <CustomThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <CloudStorageProvider>
                        {children}
                    </CloudStorageProvider>
                </AuthProvider>
            </NotificationProvider>
        </CustomThemeProvider>
    )
}