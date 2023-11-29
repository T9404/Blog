import axios from 'axios';

const getPost = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/post/${id}`, {
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
};

export default getPost;