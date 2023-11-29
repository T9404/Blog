import axios from 'axios';

const createComment = async (postId, content, parentId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/post/${postId}/comment`, {
            content: content,
            parentId: parentId,
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

export default createComment;