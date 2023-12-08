import axios from 'axios';

const subscribe = async (id) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}/community/${id}/subscribe`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    } catch (error) {
        throw error;
    }
}

export default subscribe;