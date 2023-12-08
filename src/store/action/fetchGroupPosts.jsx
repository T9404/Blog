import axios from 'axios';
import qs from 'qs';
import {setGroupPosts, setError, setLoading} from "../reducers/groupPostsSlice";

export const fetchGroupPosts = (searchParams, id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/community/${id}/post`, {
            params: {
                page: searchParams.get('page') || 1,
                size: searchParams.get('pageSize') || 5,
                sorting: searchParams.get('sorting') || 'CreateDesc',
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
            dispatch(setGroupPosts(response.data));
        } else {
            dispatch(setError('Error fetching posts'));
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};
