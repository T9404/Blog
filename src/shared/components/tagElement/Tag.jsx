import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import getTags from "../../api/tag/GetTags";
import notifyError from "../../../util/notification/error/ErrorNotify";

const TagSelect = ({ handleTagsChange, arrayTagsId }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTags();
                setTags(response);
                handleSelectedTags(response);
            } catch (error) {
                notifyError('Ошибка при загрузке тегов');
            }
        };
        
        const handleSelectedTags = (tags) => {
            const selectedTags = tags.filter(tag => arrayTagsId.includes(tag.id));
            setSelectedTags(selectedTags);
            setLoading(true);
        };
        
        (async () => {
            await fetchData();
        })();
    }, []);
    
    return (
        <div>
            {loading &&
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={selectedTags.map(tag => ({ value: tag.name, label: tag.name }))}
                isMulti
                options={tags.map(tag => ({ value: tag.name, label: tag.name }))}
                onChange={handleTagsChange}
            />
            }
        </div>
    );
};

export default TagSelect;