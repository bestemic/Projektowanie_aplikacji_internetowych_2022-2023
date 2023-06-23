import {useEffect, useState} from "react";
import api from "../api.js";
import CategoriesCard from "./CategoriesCard.jsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Quizzes = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('/categories/quizzes')
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania dostępnych quizów!', {
                    toastId: 'fetchQuizzes',
                });
            });
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 flex justify-center">Czas na
                <span className="ml-2 text-purple-700">QuizyEasy</span>
            </h2>

            <CategoriesCard categories={categories} path={'quizy'}/>
        </div>
    );
};

export default Quizzes;