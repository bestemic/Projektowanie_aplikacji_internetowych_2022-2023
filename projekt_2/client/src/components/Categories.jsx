import {useEffect, useState} from "react";
import * as Yup from "yup";
import api from "../api.js";
import CategoriesCard from "./CategoriesCard.jsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required("Nazwa jest wymagana")
            .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d\s\W]+$/, 'Nazwa kategorii nie może zawierać samych cyfr')
            .min(2, "Za krótka nazwa")
            .max(25, "Za długa nazwa")
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        api.get('/categories')
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania kategorii!', {
                    toastId: 'fetchCategories',
                });
            });
    };

    const handleCreateCategory = async (event) => {
        event.preventDefault();

        validationSchema.validate({categoryName})
            .then(() => {
                setError('');
                api.post('/categories', {name: categoryName})
                    .then(() => {
                        fetchCategories();
                        setCategoryName('');
                        setError('');
                        toast.success('Utworzono kategorię!', {
                            toastId: Math.random(),
                        });
                    })
                    .catch(error => {
                        if (!error.response) {
                            toast.error('Nie udało się utworzyć kategorii!', {
                                toastId: Math.random(),
                            });
                        } else {
                            if (error.response.status === 409 || error.response.status === 400) {
                                toast.error(error.response.data.message, {
                                    toastId: Math.random(),
                                });
                            } else {
                                toast.error('Nie udało się utworzyć kategorii!', {
                                    toastId: Math.random(),
                                });
                            }
                        }
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);

        validationSchema
            .validate({categoryName: event.target.value})
            .then(() => {
                setError('');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 flex justify-center">Kategorie</h2>

            <form onSubmit={handleCreateCategory} className="mb-4">
                <div className="flex justify-center">
                    <input
                        type="text"
                        name="categoryName"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        placeholder="Nazwa kategorii"
                        className="border border-gray-300 p-2 rounded-md mr-2 w-60"
                    />
                    <button type="submit"
                            className="bg-purple-700 hover:bg-purple-900 text-white py-2 px-4 rounded-md transition-colors duration-300">
                        Dodaj kategorię
                    </button>
                </div>
                {error && <div className="text-red-500 text-lg mt-2 flex justify-center">{error}</div>}
            </form>

            <CategoriesCard categories={categories} path={'kategorie'}/>
        </div>
    );
};

export default Categories;