import axios from 'axios';
import statusErrorMessages from "../../../util/notification/error/StatusErrorMessages";

const getAllAuthor = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/author/list`);
        if (response.status === 200) {
            return response.data;
        } else {
            const errorMessage = statusErrorMessages[response.status] || `Unexpected status code: ${response.status}`;
            return Promise.reject(Error(errorMessage));
        }
    } catch (error) {
        throw error;
    }
}

export default getAllAuthor;