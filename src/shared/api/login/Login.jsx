import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/account/login`, {
            email: email,
            password: password,
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default login;