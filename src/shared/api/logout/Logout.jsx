import axios from "axios";

const BASE_URL = 'https://blog.kreosoft.space/api';

const logout = async () => {

    try {
        const response = await axios.post(`${BASE_URL}/account/logout`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        console.log(response.data);

    } catch (error) {
        console.error('Error during login:', error);
    }

    localStorage.clear();
    window.location.reload();
}

export default logout;