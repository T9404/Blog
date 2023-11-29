import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getRole = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/community/${id}/role`, {
            params: {
                id: id
            },
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

export default getRole;