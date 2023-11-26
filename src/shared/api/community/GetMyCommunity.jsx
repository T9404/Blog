import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getMyCommunity = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/community/my`, {
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
}

export default getMyCommunity;