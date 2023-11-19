import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/action/fetchPosts';
import { setLoading } from '../../store/reducers/postsSlice';
import {useLocation, useNavigate} from 'react-router-dom';
import PaginationComponent from "../../shared/components/pagination/PaginationComponent";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const posts = useSelector((state) => state.posts.data);
    const loading = useSelector((state) => state.posts.loading);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page') || 1;
        const pageSize = params.get('pageSize') || 5;

        dispatch(fetchPosts(page, pageSize));
    }, [dispatch, location.search]);

    const handlePageChange = (page, pageSize) => {
        navigate(`/?page=${page}&pageSize=${pageSize}`);
    };

    if (!posts.length) {
        setLoading(true);
    }

    if (posts.posts) {
        console.log(posts);
        setLoading(false);
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Posts</h1>
            {posts.posts.length > 0 ? (
                <>
                    {<ul>
                        {posts.posts.map((post) => (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                {post.image && <img src={post.image} alt={post.title}/>}
                            </li>
                        ))}
                    </ul>}
                    <PaginationComponent
                        currentPage={posts.pagination.current}
                        onPageChange={handlePageChange}
                        totalPages={posts.pagination.count}
                    />
                </>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;
/*
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
        console.log(posts);
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

export default HomePage;*/
