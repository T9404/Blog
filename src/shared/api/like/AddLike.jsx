import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const addLike = async (postId) => {
    try {
        await axios.post(`${BASE_URL}/post/${postId}/like`, {},
            {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default addLike;