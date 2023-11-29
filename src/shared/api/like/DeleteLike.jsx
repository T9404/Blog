import axios from 'axios';

const deleteLike = async (postId) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/post/${postId}/like`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default deleteLike;