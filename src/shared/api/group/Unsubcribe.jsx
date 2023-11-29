import axios from 'axios';

const unsubscribe = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/community/${id}/unsubscribe`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default unsubscribe;