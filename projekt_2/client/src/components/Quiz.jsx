import {useEffect, useState} from "react";
import api from "../api.js";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import getAnswerLabel from "../utils.js";

const Quiz = () => {
    const [questionsIds, setQuestionsId] = useState([])
    const [question, setQuestion] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [notFound, setNotFound] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [showCheckButton, setShowCheckButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showEndButton, setShowEndButton] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [disableSelection, setDisableSelection] = useState(false);
    const [counter, setCounter] = useState(0);

    const {categoryId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/categories/${categoryId}`)
            .then(response => {
                setCategoryName(response.data.data.name);
                fetchQuizIds();
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

    const fetchQuizIds = () => {
        api.get(`/categories/${categoryId}/questions/quiz`, {params: {limit: 5}})
            .then(response => {
                if (response.data.data.length === 0) {
                    setNotFound(true);
                } else {
                    setQuestionsId(response.data.data);
                    fetchQuestion(response.data.data[currentQuestionIndex])
                }
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania quizu!', {
                    toastId: 'fetchQuizIds',
                });
            });
    };

    const fetchQuestion = (questionId) => {
        api.get(`/questions/${questionId}`)
            .then(response => {
                setQuestion(response.data.data);
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania pytania!', {
                    toastId: 'fetchQuestion',
                });
            });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        fetchQuestion(questionsIds[currentQuestionIndex + 1]);
        setSelectedAnswers([]);
        setShowCheckButton(true);
        setShowNextButton(false);
        setDisableSelection(false);
        setCorrectAnswers([]);
        setIncorrectAnswers([]);
    };

    const handleAnswerSelection = (answerId) => {
        if (disableSelection) {
            return
        }

        if (question.isMultipleChoice) {
            setSelectedAnswers((prevSelectedAnswers) => {
                const isSelected = prevSelectedAnswers.includes(answerId);
                if (isSelected) {
                    return prevSelectedAnswers.filter((selectedId) => selectedId !== answerId);
                } else {
                    return [...prevSelectedAnswers, answerId];
                }
            });
        } else {
            setSelectedAnswers([answerId]);
        }
    };

    const handleCheckAnswer = () => {
        if (!question.isMultipleChoice && selectedAnswers.length === 0) {
            setShowErrorMessage(true);
            return;
        }
        setShowErrorMessage(false);

        api.get(`/questions/${questionsIds[currentQuestionIndex]}/correctAnswers`)
            .then(response => {
                const answers = response.data.data;
                setCorrectAnswers(answers);
                setIncorrectAnswers(selectedAnswers.filter(answer => !answers.includes(answer)));

                if (answers.length === selectedAnswers.length && answers.every(answer => selectedAnswers.includes(answer))) {
                    setCounter((prevCount) => prevCount + 1)
                }
            })
            .catch(() => {
                toast.error('Wystąpił błąd podczas pobierania odpowiedzi!', {
                    toastId: 'fetchAnswers',
                });
            });

        setDisableSelection(true);
        setShowCheckButton(false);
        if (currentQuestionIndex !== questionsIds.length - 1) {
            setShowNextButton(true);
        } else {
            setShowEndButton(true);
        }
    };

    return (
        <div>
            {notFound ? (
                <p className="text-3xl font-bold mt-2 flex justify-center text-red-500">
                    {categoryName === '' ? 'Kategoria nie istnieje.' : `Kategoria ${categoryName} nie posiada żadnych pytań.`}
                </p>
            ) : (
                question &&
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex justify-center">Quiz</h2>
                    <h3 className="text-lg font-semibold mb-4 flex justify-center">
                        Pytanie {currentQuestionIndex + 1}
                    </h3>

                    <div className="border bg-white border-gray-300 rounded">
                        <div className="bg-purple-700 text-white p-4 rounded-t">
                            <h3 className="text-lg font-semibold">{currentQuestionIndex + 1}. {question.content}</h3>
                        </div>

                        <div className="p-4">
                            <ul className="space-y-2">
                                {question.answers.map((answer, answerIndex) => (
                                    <li
                                        key={answer.id}
                                        className={`border-gray-300 border rounded p-2 flex items-center space-x-2 ${
                                            showCheckButton && selectedAnswers.includes(answer.id) ? 'bg-orange-400' : ''
                                        } ${
                                            correctAnswers.includes(answer.id) ? 'bg-green-500' : ''
                                        } ${
                                            incorrectAnswers.includes(answer.id) ? 'bg-red-500' : ''
                                        }`}
                                        onClick={() => handleAnswerSelection(answer.id)}
                                    >
                                        {question.isMultipleChoice ? (
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={selectedAnswers.includes(answer.id)}
                                                readOnly
                                            />
                                        ) : (
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                checked={selectedAnswers.includes(answer.id)}
                                                readOnly
                                            />
                                        )}
                                        <span className={`${answer.isCorrect ? 'text-green-600' : ''}`}>
                                            {getAnswerLabel(answerIndex)}.
                                        </span>
                                        <span>{answer.content}</span>
                                    </li>
                                ))}
                                {showErrorMessage &&
                                    <p className="text-red-500 mt-2">Wybierz przynajmniej jedną odpowiedź.</p>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="flex mt-4 justify-between">
                        <h2 className="text-3xl py-2 font-bold justify-start text-purple-700">
                            {counter} / {questionsIds.length}
                        </h2>
                        <div className="flex">
                            {showCheckButton && (
                                <button
                                    className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded"
                                    onClick={handleCheckAnswer}
                                >
                                    Sprawdź odpowiedź
                                </button>
                            )}
                            {showNextButton && (
                                <button
                                    className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded"
                                    onClick={handleNextQuestion}
                                >
                                    Następne pytanie
                                </button>
                            )}
                            {showEndButton && (
                                <button
                                    className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded"
                                    onClick={() => navigate('/quizy')}
                                >
                                    Zakończ quiz
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;