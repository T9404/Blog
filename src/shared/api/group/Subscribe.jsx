import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const subscribe = async (id) => {
    try {
        await axios.post(`${BASE_URL}/community/${id}/subscribe`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    } catch (error) {
        throw error;
    }
}

export default subscribe;