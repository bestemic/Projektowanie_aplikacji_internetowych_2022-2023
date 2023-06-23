import {useEffect, useState} from "react";
import api from "../api.js";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import CategoryQuestions from "./CategoryQuestions.jsx";

const Category = () => {
    const [categoryName, setCategoryName] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const {categoryId} = useParams();

    useEffect(() => {
        api.get(`/categories/${categoryId}`)
            .then(response => {
                setCategoryName(response.data.data.name);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setNotFound(true);
                } else {
                    toast.error('Wystąpił błąd podczas pobierania kategorii!', {
                        toastId: 'fetchCategory',
                    });
                }
            });
    }, [categoryId]);

    useEffect(() => {
        setIsLoading(true);
        api.get(`/categories/${categoryId}/questions`)
            .then(response => {
                setQuestions(response.data.data);
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania pytań!', {
                    toastId: 'fetchQuestions',
                });
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [categoryId]);

    return (
        <div>
            {notFound &&
                <p className="text-3xl font-bold mt-2 flex justify-center text-red-500">
                    Kategoria o podanym ID nie istnieje.
                </p>}
            {categoryName && <h2 className="text-3xl font-bold mt-2 flex justify-center">Kategoria {categoryName}</h2>}

            {/*TODO*/}

            <CategoryQuestions isLoading={isLoading} questions={questions}/>
        </div>
    );
};

export default Category;