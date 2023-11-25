import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getPost = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/post/${id}`);
        
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default getPost;