import MainPage from "./components/MainPage.jsx";
import Navigation from "./components/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Categories from "./components/Categories.jsx";
import {ToastContainer} from "react-toastify";
import Category from "./components/Category.jsx";
import Quizzes from "./components/Quizzes.jsx";
import Quiz from "./components/Quiz.jsx";

function App() {
    return (
        <div className="App">
            <ToastContainer/>

            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="kategorie">
                        <Route index element={<Categories/>}/>
                        <Route path=":categoryId" element={<Category/>}/>
                    </Route>
                    <Route path="quizy">
                        <Route index element={<Quizzes/>}/>
                        <Route path=":categoryId" element={<Quiz/>}/>
                    </Route>
                    <Route path="*" element={<div>Nie znaleziono strony</div>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
