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

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left">Text</th>
                            <th class="px-4 py-2 text-left">Text button</th>
                            <th class="px-4 py-2 text-left">Link</th>
                            <th class="px-4 py-2 text-left">Preview</th>
                            <th class="px-4 py-2 text-left">Highlighted</th>
                            <th class="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner) => (
                            <tr key={banner._id}>
                                <td class="px-4 py-2">{banner.text}</td>
                                <td class="px-4 py-2 uppercase">{banner.textButton}</td>
                                <td class="px-4 py-2">{banner.link}</td>
                                <td class="px-4 py-2"><img src={banner.image} alt="" /></td>
                                <td class="px-4 py-2">checkbox</td>
                                <td class="px-4 py-2">edit icon</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default BannerSection;
