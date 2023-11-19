import { setPosts, setLoading, setError } from '../reducers/postsSlice';
import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

export const fetchPosts = (page, pageSize) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/post`, {
            params: {
                page: page,
                pageSize: pageSize,
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (response.status === 200) {
            dispatch(setPosts(response.data));
        } else {
            dispatch(setError('Error fetching posts'));
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};