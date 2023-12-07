import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <select
                className="form-select"
                aria-label="Default select example"
                multiple={true}
                onChange={handleTagsChange}
            >
                {tags.map(tag => (
                    <option value={tag.name}>{tag.name}</option>
                ))}
            </select>
        </div>
    );
};

export default TagSelect;