import { setPosts, setLoading, setError } from '../reducers/postsSlice';
import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api'; /////////////перевести теги в uuid как api

export const fetchPosts = (page, paramForm) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/post`, {
            params: {
                page: page,
                size: paramForm.pageSize,
                author: paramForm.searchQuery,
                min: paramForm.minReadingTime,
                max: paramForm.maxReadingTime,
                sort: paramForm.sortOption
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        
        console.log(paramForm.pageSize)

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