import {useState} from "react";

const TableGrid = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCollection = props.collection.filter(document =>
        document.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        "Certificates",
        "Identification",
        "Transcripts",
        "Reference Letters",
        "Recommendation Letters",
        "Diplomas",
        "Others",
    ];

    const CategoryButton = ({category}) => {
        const isActive = category === searchTerm;
        return (
            <button type="button"
                    className={`border border-white hover:border-gray-200 ${isActive ? "hover:text-white border-blue-600 text-blue-700 focus:ring-blue-300 hover:bg-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" : "text-gray-900 focus:ring-gray-300 dark:bg-gray-900 dark:focus:ring-gray-800"} bg-white focus:ring-4 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
                    onClick={() => setSearchTerm(category)}
            >
                {category}
            </button>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                <button type="button"
                        className={`border border-white hover:border-gray-200 ${searchTerm === "" ? "hover:text-white border-blue-600 text-blue-700 focus:ring-blue-300 hover:bg-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" : "text-gray-900 focus:ring-gray-300 dark:bg-gray-900 dark:focus:ring-gray-800"} bg-white focus:ring-4 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
                        onClick={() => setSearchTerm("")}
                >
                    All categories
                </button>
                {categories.map(category => <CategoryButton category={category} key={category}/>)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCollection.map((document) => (
                    <div key={document.name}>
                        <img className="h-auto max-w-full rounded-lg"
                             src={document.image} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TableGrid;
