import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [highlightedCategories, setHighlightedCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
            .then((response) => {
                setCategories(response.data.data);
                response.data.data.forEach((category) => {
                    handleProductsInfo(category.name);
                    handleHighlight(category.name);
                });
            })
            .catch((error) => {
                console.error(`Error fetching categories' data: `, error);
            });
    }, []);

    const handleProductsInfo = async (categoryName) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/categoryByName/${categoryName}`);
            setProductsInfo(prevproductInfo => ({
                ...prevproductInfo,
                [categoryName]: response.data.data
            }));
        } catch (error) {
            console.error(`Error fetching users' data: `, error);
        }
    }

    const handleHighlight = (category) => {
        const isHighlighted = highlightedCategories.includes(category);

        if (isHighlighted) {
            const updatedHighlightedCategories = highlightedCategories.filter((item) => item !== category);
            setHighlightedCategories(updatedHighlightedCategories);
        } else {
            if (highlightedCategories.length < 4) {
                setHighlightedCategories((prevHighlightedCategories) => [...prevHighlightedCategories, category]);
            } else {
                const updatedHighlightedCategories = [...highlightedCategories.slice(1), category];
                setHighlightedCategories(updatedHighlightedCategories);
            }
        }
    };

    // not working yet, to check with full update
    // const updateHighlight = async (ID) => {
    //     try {
    //         const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/update//${ID}`);
    //         setHighlightedCategories(prevhighlightedCategories => ({
    //             ...prevhighlightedCategories,
    //             [ID]: response.data.data._id
    //         }));
    //     } catch (error) {
    //         console.error(`Error updating highlighted data: `, error);
    //     }
    // }

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...categories].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setCategories(sortedData);
        setSortOrder(!sortOrder);
    };

    return (
        <div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("name")}>Category &#8597;</th>
                            <th class="px-4 py-2 text-left">Thumbnail</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("category")}>Qty &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("discountPercentage")}>Discounted &#8597;</th>
                            <th class="px-4 py-2 text-left">Highlighted &#8597;</th>
                            <th class="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className='border-b'>
                                <td className="px-4 py-2 capitalize">{category.name}</td>
                                <td className="px-4 py-2"><img src={category.image} alt="thumbnail" classname="" /></td>
                                <td className="px-4 py-2">
                                    {productsInfo[category.name] ? (
                                        <span>
                                            {productsInfo[category.name].length}{" "}
                                            {productsInfo[category.name].length === 1 ? "product" : "products"}
                                        </span>
                                    ) : (
                                        "0 product"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {productsInfo[category.name] && productsInfo[category.name].length > 0 ? (
                                        productsInfo[category.name].every(product => product.discountPercentage === productsInfo[category.name][0].discountPercentage) ? (
                                            `${productsInfo[category.name][0].discountPercentage}%`
                                        ) : (
                                            "-"
                                        )
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td class="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={highlightedCategories.includes(category.name) && category.highlighted}
                                        onChange={() => {
                                            handleHighlight(category.name);
                                            // updateHighlight(category._id);
                                        }}
                                    />
                                </td>
                                <td class="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit" />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100">
                    ADD CATEGORY
                </button>

            </div>

        </div>
    );
}

export default CategoriesSection;
