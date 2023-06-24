import {useEffect, useState} from "react";
import api from "../api.js";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import CategoryQuestions from "./CategoryQuestions.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/solid/index.js";

const Category = () => {
    const [categoryName, setCategoryName] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [questionContent, setQuestionContent] = useState('');
    const [answers, setAnswers] = useState([
        {content: '', isCorrect: false},
        {content: '', isCorrect: false},
    ]);

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

    const handleQuestionTypeChange = () => {
        setIsMultipleChoice(!isMultipleChoice);

        answers.forEach((answer) => {
            if (answer.isCorrect) {
                answer.isCorrect = false;
            }
        });
    };

    const handleQuestionContentChange = (event) => {
        setQuestionContent(event.target.value);
    };

    const handleAnswerContentChange = (index, event) => {
        const currentAnswers = [...answers];
        currentAnswers[index].content = event.target.value;
        setAnswers(currentAnswers);
    };

    const handleAnswerCorrectChange = (index) => {
        const currentAnswers = [...answers];

        if (!isMultipleChoice) {
            currentAnswers.forEach((answer, answerIndex) => {
                if (answerIndex !== index && answer.isCorrect) {
                    answer.isCorrect = false;
                }
            });
        }

        currentAnswers[index].isCorrect = !currentAnswers[index].isCorrect;
        setAnswers(currentAnswers);
    };

    const handleAddAnswer = () => {
        const answer = {content: '', isCorrect: false};
        setAnswers([...answers, answer]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateNewQuestion()) {
            return
        }

        const data = {
            content: questionContent,
            isMultipleChoice: isMultipleChoice,
            answers: answers
        };

        api.post(`categories/${categoryId}/questions/`, data)
            .then((response) => {
                setIsMultipleChoice(false);
                setQuestionContent('');
                setAnswers([
                    {content: '', isCorrect: false},
                    {content: '', isCorrect: false},
                ]);

                setQuestions([...questions, response.data.data]);

                toast.success('Utworzono pytanie!', {
                    toastId: Math.random(),
                });
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas tworzenia pytania!', {
                    toastId: Math.random(),
                });
            });
    };

    const validateNewQuestion = () => {
        if (questionContent.trim() === '') {
            setError('Podaj treść pytania.');
            return false;
        }

        if (answers.some(answer => answer.content.trim() === '')) {
            setError('Podaj treść odpowiedzi.');
            return false;
        }

        if (!isMultipleChoice && !answers.some(answer => answer.isCorrect)) {
            setError('Wskaż poprawną odpowiedź.');
            return false;
        }

        setError('');
        return true;
    };

    return (
        <div>
            {notFound &&
                <p className="text-3xl font-bold mt-2 flex justify-center text-red-500">
                    Kategoria o podanym ID nie istnieje.
                </p>}
            {categoryName && <h2 className="text-3xl font-bold mt-2 flex justify-center">Kategoria {categoryName}</h2>}

            <div className="mx-32 mt-10 p-4 bg-white rounded-xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mx-auto flex items-center justify-center space-x-4 ">
                        <span className="text-lg">Jednokrotny wybór</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={isMultipleChoice}
                                onChange={handleQuestionTypeChange}
                            />
                            <div
                                className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
                        </label>
                        <span className="text-lg">Wielokrotny wybór</span>
                    </div>

                    <div className="">
                        <input
                            type="text"
                            placeholder="Treść pytania"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={questionContent}
                            onChange={handleQuestionContentChange}
                        ></input>
                    </div>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-11/12 h-px my-6 bg-gray-700 border-0"/>
                        <span
                            className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                        Odpowiedzi
                    </span>
                    </div>
                    <div className="mb-1">
                        {answers.map((answer, index) => (
                            <div key={index} className="mb-2 flex items-center space-x-2">
                                {isMultipleChoice ? (
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={() => handleAnswerCorrectChange(index)}
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        checked={answer.isCorrect}
                                        onChange={() => handleAnswerCorrectChange(index)}
                                    />
                                )}
                                <input
                                    type="text"
                                    placeholder={`Treść odpowiedzi nr. ${index + 1}`}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={answer.content}
                                    onChange={(event) => handleAnswerContentChange(index, event)}
                                />
                            </div>
                        ))}
                        <div className="flex mt-5 ml-5">
                            <button
                                type="button"
                                className="bg-purple-700 text-white rounded-full w-9 h-9 flex items-center justify-center"
                                onClick={handleAddAnswer}
                            >
                                <PlusCircleIcon/>
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-700 text-white px-4 py-1 ml-10 rounded"
                            >
                                Utwórz pytanie
                            </button>
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-lg flex justify-center">{error}</div>}
                </form>
            </div>

            <CategoryQuestions isLoading={isLoading} questions={questions}/>
        </div>
    );
};

export default Category;