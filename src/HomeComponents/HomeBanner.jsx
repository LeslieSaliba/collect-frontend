import { useState } from "react";
import "../css/homebanner.css"
import axios from "axios";

function HomeBanner() {
    const [banner, setBanner] = useState("");

    const goToLink = () => {
        window.open(banner.link, '_blank');
    };

    const bannerToDisplay = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/banner/getHiglighted`);
            if (response) {
                setBanner(response.data.data[0]);
            }
            else {
                console.log("response", "empty");
            }
        } catch (error) {
            console.error(`Error fetching banners' data: `, error);
        }
    };

    bannerToDisplay();

    return (
        <div className="HomeBanner-container flex items-center justify-center">
            <div className="HomeBanner-container-mini flex items-center justify-between my-16">
                <div className="HomeBanner-title-btn ml-20">
                    <h1 className="text-4xl mb-4 w-96 italic responsive-text-banner">{banner.text}</h1>
                    <button
                        className="bg-white text-red-700 font-bold py-2 px-10 border border-red-700 text-lg inline-block mt-5 hover:bg-red-100 responsive-text-button"
                        onClick={goToLink}
                    >
                        {banner.textButton}
                    </button>
                </div>
                <div>
                    <img src={banner.image} alt="" className="HomeBanner-img" />
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;