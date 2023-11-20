import { setPosts, setLoading, setError } from '../reducers/postsSlice';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'https://blog.kreosoft.space/api';

export const fetchPosts = (page, paramForm) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/post`, {
            params: {
                page: page,
                size: paramForm.pageSize,
                author: paramForm.searchQuery,
                min: paramForm.minReadingTime,
                max: paramForm.maxReadingTime,
                sort: paramForm.sortOption,
                tags: paramForm.tags,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        
        console.log(paramForm.tags.join(','));

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