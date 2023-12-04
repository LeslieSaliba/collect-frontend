import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function CategoriesSection() {
    const [categories, setCategories] = useState([]);

    //   useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/categories/getAll`)
    //       .then((response) => {
    //         // setCategories(response.data.data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching orders data:', error);
    //       });
    //   }, []);

    return (
        <div className="section">

            <div className="scrollable-table">
                <table className="container table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">x</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {orders.map((orders) => ( */}
                        {/* <tr key={orders._id}> */}
                            <tr>
                                <th scope="row">Name</th>
                                <td>Date</td>
                                <td>Qty</td>
                                <td>Total</td>
                                <td>Status</td>
                                <td>view details</td>
                            </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default CategoriesSection;
