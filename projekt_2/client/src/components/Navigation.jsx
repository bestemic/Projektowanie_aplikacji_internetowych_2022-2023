import {Link, Outlet} from 'react-router-dom';

const Navigation = () => {
    return (
        <div>

            <nav className="bg-purple-700 py-4 w-full">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white text-xl font-bold mx-10">QuizyEasy</Link>
                    <ul className="flex space-x-4 mx-10">
                        <li>
                            <Link to="/" className="text-white hover:text-purple-300 transition duration-300">
                                QuizyEasy
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" className="text-white hover:text-purple-300 transition duration-300">
                                Kategorie
                            </Link>
                        </li>
                        <li>
                            <Link to="/quizzes" className="text-white hover:text-purple-300 transition duration-300">
                                Quizy
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="p-8 flex flex-col items-center w-90">
                <div className="container p-8 bg-gray-100 rounded-xl">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
