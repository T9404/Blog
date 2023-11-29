import axios from 'axios';

const getSubComments = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/comment/${id}/tree`);

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default getSubComments;