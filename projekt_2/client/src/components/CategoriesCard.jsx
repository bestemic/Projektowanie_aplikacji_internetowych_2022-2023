import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const CategoriesCard = (props) => {
    const categories = props.categories;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={`/kategorie/${category.id}`}
                    className={`bg-white p-4 text-gray-800 rounded-lg shadow-md flex items-center justify-center transition-colors duration-300 hover:bg-purple-900 hover:text-white`}
                >
                    <span>{category.name}</span>
                </Link>
            ))}
        </div>
    );
};

CategoriesCard.propTypes = {
    categories: PropTypes.array
};

export default CategoriesCard;
