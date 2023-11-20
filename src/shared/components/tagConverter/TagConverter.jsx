import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const tagConverter = async (selectedOptions) => {
    try {
        const response = await axios.get(`${BASE_URL}/tag`);
        
        if (Array.isArray(response.data)) {
            const idTags = [];
            for (let i = 0; i < selectedOptions.length; i++) {
                for (let j = 0; j < response.data.length; j++) {
                    if (selectedOptions[i] === response.data[j].name) {
                        idTags.push(response.data[j].id);
                    }
                }
            }
            return idTags;
        } else {
            console.error('Invalid response format. Expected an array.');
        }
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

export default tagConverter;