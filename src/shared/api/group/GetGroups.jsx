import axios from 'axios';

const getAllGroups = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/community`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default getAllGroups;