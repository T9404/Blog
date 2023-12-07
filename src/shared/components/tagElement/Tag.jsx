import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const TagSelect = ({ handleTagsChange }) => {
    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        axios.get('https://blog.kreosoft.space/api/tag')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);
    
    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={[]}
                isMulti
                options={tags.map(tag => ({ value: tag.name, label: tag.name }))}
                onChange={handleTagsChange}
            />
        </div>
    );
};

export default TagSelect;