import axios from 'axios';

const editComment = async (commentId, content) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/comment/${commentId}`, {
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