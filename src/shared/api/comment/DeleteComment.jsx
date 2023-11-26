import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/comment/${commentId}`, {
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

export default deleteComment;
