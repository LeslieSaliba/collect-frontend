import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching categories' data: `, error);
            });
    }, []);

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
                            <tr key={category._id}>
                                <td className="px-4 py-2">{category.name}</td>
                                <td className="px-4 py-2"><img src={category.image} alt="thumbnail" classname="" /></td>
                                <td className="px-4 py-2">Qty - getproductsbycategoryname</td>
                                <td class="px-4 py-2">Discounted - getproductsbycategoryname</td>
                                <td class="px-4 py-2"><input type="checkbox" /></td>
                                <td class="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit" />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default CategoriesSection;
