import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function ProductsSection() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
            .then((response) => {
                setProducts(response.data.data);
                const categoryIds = response.data.data.map(product => product.categoryID);
                categoryIds.forEach(fetchCategoryName);
            })
            .catch((error) => {
                console.error(`Error fetching products' data: `, error);
            });
    }, []);

    const fetchCategoryName = async (ID) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getbyID/${ID}`);
            const { name } = response.data.data;
            setCategories(prevCategories => ({
                ...prevCategories,
                [ID]: name
            }));
        } catch (error) {
            console.error(`Error fetching categories' data: `, error);
        }
    }

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...products].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setProducts(sortedData);
        setSortOrder(!sortOrder);
    };

    return (
        <div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left">Category</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("name")}>Name &#8597;</th>
                            <th class="px-4 py-2 text-left">Thumbnail</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("price")}>Price &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("disocuntPercentage")}>Discounted &#8597;</th>
                            <th class="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b'>
                                <td className="px-4 py-2 align-middle capitalize">{categories[product.categoryID]}</td>
                                <td class="px-4 py-2 align-middle capitalize">{product.name}</td>
                                <td class="px-4 py-2 align-middle"><img src={product.images[0]} alt="product" /></td>
                                <td class="px-4 py-2 align-middle">{product.price}</td>
                                <td class="px-4 py-2 align-middle">{product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'}</td>
                                <td class="px-4 py-2 align-middle">{product.status}</td>
                                <td class="px-4 py-2 flex">
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit" />
                                    <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100">
                    ADD PRODUCT
                </button>

            </div>

        </div>
    );
}

export default ProductsSection;
