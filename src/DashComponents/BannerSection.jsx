import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import EditBanner from "./DashModals/EditBanner";

function BannerSection() {
    const [banners, setBanners] = useState([]);
    const [showEditBannerModal, setShowEditBannerModal] = useState(false);
    const [selectedBannerID, setSelectedBannerID] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const token = localStorage.getItem("token");

    const fetchBanners = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/banner/getAll`)
            .then((response) => {
                setBanners(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching banners' data: `, error);
            });
    };
    
    const changeHighlited = async (e, bannerID) => {
        let updatedIsClicked = e.target.value;
        if (updatedIsClicked) {
            updatedIsClicked = true;
        }
        try {
            banners.map(async (banner) => {
                if (banner._id !== bannerID) {
                    console.log("banner._id", banner._id);
                    const response = await axios.put(
                        `${process.env.REACT_APP_API_URL}/banner/updateHiglited/${banner._id}`,
                        { higlighted: false },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("Response after update request1:", banner._id, response);
                } else {
                    const response = await axios.put(
                        `${process.env.REACT_APP_API_URL}/banner/updateHiglited/${bannerID}`,
                        { higlighted: updatedIsClicked },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("Response after update request2:", banner._id, response);
                }
            });

            fetchBanners()
        } catch (error) {
            console.log("Response after update request:", error.message);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const openEditBannerModal = (bannerID) => {
        const selected = banners.find((banner) => banner._id === bannerID);
        setSelectedBanner(selected);
        setSelectedBannerID(bannerID);
        setShowEditBannerModal(true);
    };

    const closeEditBannerModal = () => {
        setShowEditBannerModal(false);
    };

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
                            <tr key={banner._id} className="border-b">
                                <td className="px-4 py-2">{banner.text}</td>
                                <td className="px-4 py-2 uppercase">{banner.textButton}</td>
                                <td className="px-4 py-2 w-1/4">{banner.link}</td>
                                <td className="px-4 py-2">
                                    <img src={banner.image} alt="" />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="radio"
                                        name="banner"
                                        value={banner.higlighted}
                                        checked={banner.higlighted}
                                        onChange={(e) => changeHighlited(e, banner._id)}
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <img
                                        className="h-6 w-6"
                                        src="../Images/dashboardIcons/edit.png"
                                        alt="edit"
                                        onClick={() => openEditBannerModal(banner._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showEditBannerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 relative z-10 w-96">
                        <button
                            onClick={closeEditBannerModal}
                            className="absolute top-0 right-0 m-4 px-2 py-1"
                        >
                            X
                        </button>
                        <EditBanner
                            fetchBanners={fetchBanners}
                            closeEditBannerModal={closeEditBannerModal}
                            bannerID={selectedBannerID}
                            banner={selectedBanner}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BannerSection;
