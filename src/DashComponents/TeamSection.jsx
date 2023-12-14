import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";
import AddUser from "./DashModals/AddUser";
import DeleteUser from "./DashModals/DeleteUser";
import EditUser from "./DashModals/EditUser";

function TeamSection() {
    const [team, setTeam] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState(null);
    const token = localStorage.getItem('token');

    const fetchTeam = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
            .then((response) => {
                setTeam(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching team's data: `, error);
            });
    }

    useEffect(() => {
        fetchTeam();
    }, []);

    const [sortOrder, setSortOrder] = useState(true);
    const toggleSort = (field) => {
        const sortedData = [...team].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder ? -1 : 1;
            if (a[field] > b[field]) return sortOrder ? 1 : -1;
            return 0;
        });
        setTeam(sortedData);
        setSortOrder(!sortOrder);
    };

    const openAddUserModal = () => {
        setShowAddUserModal(true);
    };

    const closeAddUserModal = () => {
        setShowAddUserModal(false);
    };

    const deleteUser = async (userID) => {
        console.log('User ID to be deleted:', userID);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete/${userID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('User deleted successfully');
            await fetchTeam();
            closeDeleteUserModal();
        } catch (error) {
            console.error('Error deleting team member data: ', error);
            if (error.response) {
                console.log('Error while deleting user')
            }
        }
    };

    const openDeleteUserModal = (userID) => {
        setSelectedUserID(userID);
        setShowDeleteUserModal(true);
    };

    const closeDeleteUserModal = () => {
        setShowDeleteUserModal(false);
    };

    // const editUser = async (userID) => {
    //     console.log('User ID to be updated:', userID);
    //     try {
    //         const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userID}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //         });
    //         console.log('User updated successfully');
    //         await fetchTeam();
    //         closeEditUserModal();
    //     } catch (error) {
    //         console.error('Error updating team member data: ', error);
    //         if (error.response) {
    //             console.log('Error while updating user')
    //         }
    //     }
    // };

    const openEditUserModal = (userID) => {
        setSelectedUserID(userID);
        setShowEditUserModal(true);
    };

    const closeEditUserModal = () => {
        setShowEditUserModal(false);
    };

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("fullName")}>Name &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("email")}>Email &#8597;</th>
                            <th className="px-4 py-2 text-left" onClick={() => toggleSort("role")}>Role &#8597;</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {team
                            .filter((teamMember) => teamMember.role === 'admin' || teamMember.role === 'seller')
                            .map((teamMember) => (
                                <tr key={teamMember._id} className='border-b'>
                                    <td className="px-4 py-2 capitalize">{`${teamMember.fullName.firstName} ${teamMember.fullName.lastName}`}</td>
                                    <td className="px-4 py-2">{teamMember.email}</td>
                                    <td className="px-4 py-2">{teamMember.role}</td>
                                    <td className="px-4 py-2 flex">
                                        <img className='h-6 w-6' src="../Images/dashboardIcons/edit.png" alt="edit"
                                            onClick={() => openEditUserModal(teamMember._id)} />
                                        <img className='h-6 w-6' src="../Images/dashboardIcons/delete.png" alt="delete"
                                            onClick={() => openDeleteUserModal(teamMember._id)} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {showDeleteUserModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeDeleteUserModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <DeleteUser fetchTeam={fetchTeam} closeDeleteUserModal={closeDeleteUserModal} deleteUser={deleteUser} userID={selectedUserID} />
                        </div>
                    </div>
                )}
                {showEditUserModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeEditUserModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <EditUser fetchTeam={fetchTeam} closeEditUserModal={closeEditUserModal} userID={selectedUserID} />
                        </div>
                    </div>
                )}

                <button className="text-red-700 border border-red-700 px-4 py-2 mt-4 hover:bg-red-100"
                    onClick={openAddUserModal}>
                    ADD USER
                </button>
                {showAddUserModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-6 relative z-10">
                            <button onClick={closeAddUserModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                            <AddUser fetchTeam={fetchTeam} closeAddUserModal={closeAddUserModal} />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default TeamSection;
