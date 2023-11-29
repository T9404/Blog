import { setPosts, setLoading, setError } from '../reducers/postsSlice';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'https://blog.kreosoft.space/api';

export const fetchPosts = (searchParams) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/post`, {
            params: {
                page: searchParams.get('page') || 1,
                size: searchParams.get('pageSize') || 5,
                author: searchParams.get('search') || '',
                min: searchParams.get('minReadingTime') || '',
                max: searchParams.get('maxReadingTime') || '',
                sorting: searchParams.get('sorting') || 'CreateDesc',
                onlyMyCommunities: searchParams.get('onlyMyCommunities') || false,
                tags: searchParams.get('tags') || []
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
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

