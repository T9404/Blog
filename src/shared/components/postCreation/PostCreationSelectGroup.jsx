import React, { useState, useEffect } from 'react';
import getMyCommunity from "../../api/community/GetMyCommunity";
import {useNavigate} from "react-router-dom";
import convertCommunityIdToName from "../../../util/CommunityConverter";

const PostCreationSelectGroup = ({ handleGroupChange }) => {
    const [group, setGroup] = useState([]);
    const [groupNames, setGroupNames] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupData = await getMyCommunity();
                const filteredGroupData = groupData.filter(tag => tag.role === 'Administrator');
                setGroup(filteredGroupData);
                
                const namesPromises = filteredGroupData.map(tag => convertCommunityIdToName(tag.communityId));
                const names = await Promise.all(namesPromises);
                setGroupNames(names);
            } catch (error) {
                navigate("/login");
                localStorage.clear();
            }
        };
        
        fetchData();
    }, [navigate]);
    
    return (
        <div>
            <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleGroupChange}
            >
                {group.map((tag, index) => (
                    <option key={tag.communityId} value={tag.communityId}>
                        {groupNames[index]}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PostCreationSelectGroup;