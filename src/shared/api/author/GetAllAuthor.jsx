import axios from 'axios';

const getAllAuthor = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/author/list`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default getAllAuthor;