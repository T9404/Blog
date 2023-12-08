import axios from 'axios';

const getMyCommunity = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/community/my`, {
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