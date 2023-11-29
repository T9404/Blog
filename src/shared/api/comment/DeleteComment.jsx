import axios from 'axios';

const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/comment/${commentId}`, {
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
