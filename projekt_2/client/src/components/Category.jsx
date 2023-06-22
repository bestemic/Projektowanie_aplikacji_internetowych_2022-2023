import {useEffect, useState} from "react";
import api from "../api.js";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

const Category = () => {
    const [categoryName, setCategoryName] = useState('');
    const [notFound, setNotFound] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        api.get(`/categories/${id}`)
            .then(response => {
                setCategoryName(response.data.data.name);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setNotFound(true);
                } else {
                    toast.error('Wystąpił błąd podczas pobierania kategorii!', {
                        toastId: Math.random(),
                    });
                }
            });
    }, [id]);

    return (
        <div>
            {notFound &&
                <p className="text-3xl font-bold mt-2 flex justify-center text-red-500">
                    Kategoria o podanym ID nie istnieje.
                </p>}
            {categoryName && <h2 className="text-3xl font-bold mt-2 flex justify-center">Kategoria {categoryName}</h2>}
        </div>
    );
};

export default Category;