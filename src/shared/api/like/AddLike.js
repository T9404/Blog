import axios from 'axios';

const addLike = async (postId) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}/post/${postId}/like`, {},
            {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
    } catch (error) {
        throw error;
    }
}

export default addLike;