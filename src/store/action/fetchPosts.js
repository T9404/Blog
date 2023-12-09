import { setPosts, setLoading, setError } from '../reducers/postsSlice';
import axios from 'axios';
import qs from 'qs';

export const fetchPosts = (searchParams) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/post`, {
            params: {
                page: searchParams.get('page') || 1,
                size: searchParams.get('pageSize') || 5,
                author: searchParams.get('search') || '',
                min: searchParams.get('minTime') || '',
                max: searchParams.get('maxTime') || '',
                sorting: searchParams.get('sorting') || 'CreateDesc',
                onlyMyCommunities: searchParams.get('onlyMyCommunities') || false,
                tags: searchParams.getAll('tags') || []
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

