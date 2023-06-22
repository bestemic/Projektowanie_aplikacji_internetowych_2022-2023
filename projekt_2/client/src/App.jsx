import MainPage from "./components/MainPage.jsx";
import Navigation from "./components/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Categories from "./components/Categories.jsx";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <div className="App">
            <ToastContainer/>

            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="kategorie">
                        <Route index element={<Categories/>}/>
                    </Route>
                    <Route path="quizy">
                        <Route index element={<MainPage/>}/>
                    </Route>
                    <Route path="*" element={<div>Nie znaleziono strony</div>}/>
                </Route>
            </Routes>

        </div>
    )
}

export default App
