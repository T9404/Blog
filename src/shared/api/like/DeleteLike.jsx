import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const deleteLike = async (postId) => {
    try {
        await axios.delete(`${BASE_URL}/post/${postId}/like`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default deleteLike;