import PropTypes from "prop-types";
import {CheckIcon} from '@heroicons/react/20/solid';
import getAnswerLabel from "../utils.js";

const CategoryQuestions = (props) => {
    const isLoading = props.isLoading;
    const questions = props.questions;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 mt-2 flex justify-center">Pytania</h2>

            {isLoading ? (
                <p className="text-gray-500 flex justify-center">Ładowanie pytań...</p>
            ) : questions.length === 0 ? (
                <p className="text-gray-500 flex justify-center">Brak pytań w tej kategorii.</p>
            ) : (
                <ul className="space-y-4">
                    {questions.map((question, index) => (
                        <li key={question.id} className="border bg-white border-gray-300 rounded">
                            <div className="bg-purple-700 text-white p-4 rounded-t">
                                <h3 className="text-lg font-semibold">{index + 1}. {question.content}</h3>
                            </div>

                            <div className="p-4">
                                <ul className="space-y-2">
                                    {question.answers.map((answer, answerIndex) => (
                                        <li
                                            key={answer.id}
                                            className={`${
                                                answer.isCorrect ? 'bg-green-300' : ''
                                            } border-gray-300 border rounded p-2 flex items-center space-x-2`}
                                        >
                                            <span className={`${answer.isCorrect ? 'text-green-600' : ''}`}>
                                                {getAnswerLabel(answerIndex)}.
                                            </span>
                                            <span>{answer.content}</span>
                                            {answer.isCorrect && (
                                                <CheckIcon className="h-5 w-5 text-green-600"/>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

CategoryQuestions.propTypes = {
    isLoading: PropTypes.bool,
    questions: PropTypes.array
};


export default CategoryQuestions;