import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/action/fetchPosts';
import {setLoading} from "../../store/reducers/postsSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.data);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    if (!posts.length) {
        setLoading(true);
    }

    if (posts.posts) {
        console.log(posts.posts[0].title);
        setLoading(false);
    }


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Posts</h1>
            {posts.posts.length > 0 ? (
                <ul>
                    {posts.posts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            {post.image && <img src={post.image} alt={post.title} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;