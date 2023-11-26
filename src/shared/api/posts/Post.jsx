import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getPost = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/post/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default getPost;