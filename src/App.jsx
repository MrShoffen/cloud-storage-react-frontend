import './App.css'
import Test from "./Test.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BaseLayout} from "./pages/BaseLayout.jsx";
import {GlobalProvider} from "./context/GlobalProvider.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {SignUp} from "./pages/SignUp.jsx";

function App() {

    return (
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route path="cloud-storage" element={<BaseLayout/>}>
                        <Route index element={<Test/>}/>

                        <Route path="login" element={<SignIn/>}/>
                        <Route path="registration" element={<SignUp/>}/>
                    </Route>
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    )
}

export default App
