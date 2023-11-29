import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const unsubscribe = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/community/${id}/unsubscribe`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default unsubscribe;