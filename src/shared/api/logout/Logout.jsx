import axios from "axios";

const BASE_URL = 'https://blog.kreosoft.space/api';

const logout = async () => {

    try {
        await axios.post(`${BASE_URL}/account/logout`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
    }

    localStorage.clear();
    window.location.reload();
}

export default logout;