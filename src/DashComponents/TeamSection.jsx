import { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Dashboard.css";

function TeamSection() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
            .then((response) => {
                console.log(response)
                setTeam(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching team's data: `, error);
            });
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

    return (
        <div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("fullName")}>Name &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("email")}>Email &#8597;</th>
                            <th class="px-4 py-2 text-left" onClick={() => toggleSort("role")}>Role &#8597;</th>
                            <th class="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {team
                            .filter((teamMember) => teamMember.role === 'admin' || teamMember.role === 'seller')
                            .map((teamMember) => (
                                <tr key={teamMember._id}>
                                    <td class="px-4 py-2 capitalize">{`${teamMember.fullName.firstName} ${teamMember.fullName.lastName}`}</td>
                                    <td class="px-4 py-2">{teamMember.email}</td>
                                    <td class="px-4 py-2">{teamMember.role}</td>
                                    <td class="px-4 py-2">edit + delete icons</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default TeamSection;
