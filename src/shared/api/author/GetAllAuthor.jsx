import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getAllAuthor = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/author/list`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default getAllAuthor;