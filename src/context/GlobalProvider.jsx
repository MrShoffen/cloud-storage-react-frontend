import {CustomThemeProvider} from "./GlobalThemeContext/CustomThemeProvider.jsx";


export const GlobalProvider = ({children}) => {

    return (
        <CustomThemeProvider>
            {children}
        </CustomThemeProvider>
    )
}