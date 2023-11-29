import axios from 'axios';

const getRole = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/community/${id}/role`, {
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