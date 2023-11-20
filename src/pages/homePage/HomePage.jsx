import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/action/fetchPosts';
import { setLoading } from '../../store/reducers/postsSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationComponent from "../../shared/components/pagination/PaginationComponent";
import PostElement from "../../shared/components/postElement/PostElement";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const posts = useSelector((state) => state.posts.data);
    const loading = useSelector((state) => state.posts.loading);
    const [authenticated, setAuthenticated] = useState(false);
    
    const [form, setForm] = useState({
        searchQuery: '',
        sortOption: '',
        minReadingTime: '',
        maxReadingTime: '',
        pageSize: 5
    });
    
    
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page') || 1;
        // const pageSize = params.get('pageSize') || 5;
        
        dispatch(fetchPosts(page, form));
    }, [dispatch, location.search, form]);
    
    const handlePageChange = (page) => {
        navigate(`/?page=${page}&pageSize=${form.pageSize}&search=${form.searchQuery}&sort=${form.sortOption}&minTime=${form.minReadingTime}&maxTime=${form.maxReadingTime}`);
    };
    
    useEffect(() => {
        console.log("useEffect")
        const params = new URLSearchParams(location.search);
        const page = params.get('page') || 1;
        const pageSize = params.get('pageSize') || 5;
        
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
        
        dispatch(fetchPosts(page, pageSize));
    }, [dispatch, location.search]);
    
    if (!posts || !posts.length) {
        setLoading(true);
    }
    
    if (posts.posts) {
        console.log(posts);
        setLoading(false);
    }
    
    if (loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
    
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h1></h1>
                {authenticated && (<button className="btn btn-primary">Написать пост</button>)}
            </div>
            
            <div>
                <p>Фильтры</p>
                <div className="d-flex flex-column flex-md-row bd-highlight">
                    <div className="p-2 flex-fill bd-highlight">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по имени автора"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            onChange={e => setForm({...form, searchQuery: e.currentTarget.value})}
                        />
                    </div>
                    <div className="p-2 flex-fill bd-highlight">
                        <select className="form-select" aria-label="Default select example">
                            <option value="1">Комп железо</option>
                            <option value="2">По другим признакам</option>
                            <option value="3">По другим признакам</option>
                        </select>
                    </div>
                </div>
                
                <label className={`form-check-label`} htmlFor="flexCheckDefault">
                    Сортировать по
                </label>
                <div className="d-flex flex-column flex-md-row bd-highlight">
                    <div className="p-2 flex-fill bd-highlight">
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={e => setForm({...form, sortOption: e.currentTarget.value})}
                        >
                            <option value="CreateDesc">По дате создания (сначала новые)</option>
                            <option value="CreateAsc">По дате создания (сначала старые)</option>
                            <option value="LikeAsc">По количеству лайков (по возрастанию)</option>
                            <option value="LikeDesc">По количеству лайков (по убыванию)</option>
                        </select>
                    </div>
                    <div className="p-2 flex-fill bd-highlight">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Время чтения от"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            onChange={e => setForm({...form, minReadingTime: e.currentTarget.value})}
                        />
                    </div>
                    <div className="p-2 flex-fill bd-highlight">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Время чтения до"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            onChange={e => setForm({...form, maxReadingTime: e.currentTarget.value})}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox" value=""
                                id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Только мои группы
                            </label>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {handlePageChange(1)}} //////////////////////////////////////////////////
                        >
                            Применить
                        </button>
                    </div>
                </div>
            </div>
            
            {posts && posts.posts && posts.posts.length > 0 ? (
                <>
                    {<ul>
                        {posts.posts.map((post) => (
                            <PostElement key={post.id} post={post} />
                        ))}
                    </ul>}
                    
                    <div className="d-flex flex-column flex-md-row bd-highlight">
                    <div className="p-2 flex-fill bd-highlight">
                    <PaginationComponent
                        currentPage={posts.pagination.current}
                        onPageChange={handlePageChange}
                        totalPages={posts.pagination.count}
                    />
                    </div>
                    <div className="p-2 flex-fill bd-highlight">
                        <label htmlFor="countPosts" className="form-label">
                            Число постов на странице
                        </label>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setForm({...form, pageSize: Number(e.currentTarget.value)})}
                                value={form.pageSize}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>
                    </div>
                </>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;