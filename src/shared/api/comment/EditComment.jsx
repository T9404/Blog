import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const editComment = async (commentId, content) => {
    try {
        const response = await axios.put(`${BASE_URL}/comment/${commentId}`, {
            content: content,
        }, {
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

export default editComment;