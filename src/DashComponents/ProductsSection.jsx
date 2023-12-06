import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function ProductsSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching products' data: `, error);
            });
    }, []);

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
                            <th class="px-4 py-2 text-left">Name &#8597;</th>
                            <th class="px-4 py-2 text-left">Thumbnail</th>
                            <th class="px-4 py-2 text-left">Price &#8597;</th>
                            <th class="px-4 py-2 text-left">Discounted &#8597;</th>
                            <th class="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className={`${index !== products.length - 1 ? 'border-b' : ''}`}>
                                <td class="px-4 py-2 align-middle">xxx</td>
                                <td class="px-4 py-2 align-middle capitalize">{product.name}</td>
                                <td class="px-4 py-2 align-middle"><img src={product.images[0]} alt="" /></td>
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
            </div>

        </div>
    );
}

export default ProductsSection;
