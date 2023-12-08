import axios from 'axios';
import statusErrorMessages from "../../../util/notification/error/StatusErrorMessages";

const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/account/login`, {
            email: email,
            password: password,
        });
        
        if (response.status === 200) {
            return response.data;
        } else {
            const errorMessage = statusErrorMessages[response.status] || `Unexpected status code: ${response.status}`;
            return Promise.reject(Error(errorMessage));
        }
    } catch (error) {
        throw new Error("Invalid email or password");
    }
};

export default login;