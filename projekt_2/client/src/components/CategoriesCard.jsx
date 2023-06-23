import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const CategoriesCard = (props) => {
    const categories = props.categories;
    const path = props.path;

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={`/${path}/${category.id}`}
                    className={`bg-white px-4 py-7 text-xl text-gray-800 rounded-lg shadow-md flex items-center justify-center transition-colors duration-300 hover:bg-purple-900 hover:text-white`}
                >
                    <span>{category.name}</span>
                </Link>
            ))}
        </div>
    );
};

CategoriesCard.propTypes = {
    categories: PropTypes.array,
    path: PropTypes.string
};

export default CategoriesCard;
