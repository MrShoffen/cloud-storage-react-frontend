import {CustomThemeProvider} from "./GlobalThemeContext/CustomThemeProvider.jsx";
import {NotificationProvider} from "./Notification/NotificationProvider.jsx";
import {AuthProvider} from "./Auth/AuthContext.jsx";
import {StorageNavigationProvider} from "./Storage/StorageNavigationProvider.jsx";
import {StorageViewProvider} from "./Storage/StorageViewProvider.jsx";
import {StorageSelectionProvider} from "./Storage/StorageSelectionProvider.jsx";

export const GlobalProvider = ({children}) => {

    return (
        <CustomThemeProvider>
            <NotificationProvider>
                <AuthProvider>

                    <StorageSelectionProvider>
                        <StorageViewProvider>
                            <StorageNavigationProvider>
                                {children}
                            </StorageNavigationProvider>
                        </StorageViewProvider>
                    </StorageSelectionProvider>

                </AuthProvider>
            </NotificationProvider>
        </CustomThemeProvider>
    )
}