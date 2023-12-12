import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function BannerSection() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/banner/getAll`)
            .then((response) => {
                setBanners(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching banners' data: `, error);
            });
    }, []);

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Text</th>
                            <th className="px-4 py-2 text-left">Text button</th>
                            <th className="px-4 py-2 text-left">Link</th>
                            <th className="px-4 py-2 text-left">Preview</th>
                            <th className="px-4 py-2 text-left">Highlighted</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner) => (
                            <tr key={banner._id} className='border-b'>
                                <td className="px-4 py-2">{banner.text}</td>
                                <td className="px-4 py-2 uppercase">{banner.textButton}</td>
                                <td className="px-4 py-2 w-1/4">{banner.link}</td>
                                <td className="px-4 py-2"><img src={banner.image} alt="" /></td>
                                <td className="px-4 py-2"><input type="checkbox" /></td>
                                <td className="px-4 py-2">                                    <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default BannerSection;
