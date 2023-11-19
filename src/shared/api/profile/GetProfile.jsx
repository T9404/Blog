import axios from "axios";

const BASE_URL = 'https://blog.kreosoft.space/api';

const getProfile = async () => {

    try {
        const response = await axios.get(`${BASE_URL}/account/profile`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        throw error;
    }
}

export default getProfile;