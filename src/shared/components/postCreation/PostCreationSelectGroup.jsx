import React, { useState, useEffect } from 'react';
import getMyCommunity from "../../api/community/GetMyCommunity";
import {useNavigate} from "react-router-dom";
import convertCommunityIdToName from "../../../util/CommunityConverter";
import notifyError from "../../../util/notification/error/ErrorNotify";
import makeAnimated from "react-select/animated";
import Select from "react-select";

const PostCreationSelectGroup = ({ handleGroupChange }) => {
    const [group, setGroup] = useState([]);
    const [groupNames, setGroupNames] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupData = await getMyCommunity();
                const filteredGroupData = groupData.filter(tag => tag.role === 'Administrator');
                filteredGroupData.unshift({ communityId: '', role: 'Administrator' });
                setGroup(filteredGroupData);
                
                const namesPromises = filteredGroupData.map(tag => convertCommunityIdToName(tag.communityId));
                const names = await Promise.all(namesPromises);
                setGroupNames(names);
            } catch (error) {
                notifyError('Вы не авторизованы, пожалуйста, войдите заново');
                navigate('/login');
                localStorage.clear();
            }
        };
        
        fetchData();
    }, [navigate]);
    
    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                options={[
                    { value: '', label: '' },
                    ...group.map((tag, index) => ({ value: tag.communityId, label: groupNames[index] })),
                ]}
                onChange={handleGroupChange}
            />
        </div>
    );
};

export default PostCreationSelectGroup;