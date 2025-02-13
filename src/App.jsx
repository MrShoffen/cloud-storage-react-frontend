import './App.css'

import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {BaseLayout} from "./pages/BaseLayout.jsx";
import {GlobalProvider} from "./context/GlobalProvider.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import Index from "./pages/Index.jsx";
import UnavailableAfterLoginRoute from "./context/Auth/UnavailableAfterLoginRoute.jsx";
import AvailableAfterLoginRoute from "./context/Auth/AvailableAfterLoginRoute.jsx";
import Files from "./pages/Files.jsx";
import FastLogin from "./pages/FastLogin.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {


    return (
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route path="cloud-storage" element={<BaseLayout/>}>
                        <Route index element={<Index/>}/>

                        <Route path="*" element={<ErrorPage />}/>

                        {/*available before login only*/}
                        <Route path="login"
                               element={
                                   <UnavailableAfterLoginRoute>
                                       <SignIn/>
                                   </UnavailableAfterLoginRoute>
                               }/>

                        <Route path="registration"
                               element={
                                   <UnavailableAfterLoginRoute>
                                       <SignUp/>
                                   </UnavailableAfterLoginRoute>
                               }/>

                        <Route path="fast-sign-up"
                               element={
                                   <UnavailableAfterLoginRoute>
                                       <FastLogin/>
                                   </UnavailableAfterLoginRoute>
                               }/>

                        {/*available after login only*/}

                        <Route path="files/*"
                               element={
                                   <AvailableAfterLoginRoute>
                                       <Files/>
                                   </AvailableAfterLoginRoute>
                               }/>

                    </Route>
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    )
}

export default App
