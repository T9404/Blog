import axios from 'axios';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/account/login`, {
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