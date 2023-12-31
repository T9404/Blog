import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPosts} from '../../store/action/fetchPosts';
import {setLoading} from '../../store/reducers/postsSlice';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import PaginationComponent from "../../shared/components/pagination/PaginationComponent";
import PostElement from "../../shared/components/postElement/PostElement";
import tagConverterNameToId from "../../util/converter/TagConverterNameToId";
import LoadingComponent from "../../shared/components/loading/Loading";
import TagSelect from "../../shared/components/tagElement/Tag";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const posts = useSelector((state) => state.posts.data);
    const loading = useSelector((state) => state.posts.loading);
    const [authenticated, setAuthenticated] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    
    const [form, setForm] = useState({
        searchQuery: '',
        sorting: 'CreateDesc',
        minReadingTime: '',
        maxReadingTime: '',
        pageSize: 5,
        onlyMyCommunities: false,
        tags: []
    });
    
    useEffect(() => {
        const page = searchParams.get('page') || 1;
        
        setForm({
            pageSize: Number(searchParams.get('pageSize')) || 5,
            tags: searchParams.getAll('tags') || [],
            searchQuery: searchParams.get('search'),
            sorting: searchParams.get('sorting') || 'CreateDesc',
            minReadingTime: searchParams.get('minTime') || '',
            maxReadingTime: searchParams.get('maxTime') || '',
            onlyMyCommunities: searchParams.get('onlyMyCommunities') || false
        });
        
        dispatch(fetchPosts(searchParams))
        
        
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
        handlePageChange(page)
        setSearchParams(searchParams);
    }, [dispatch, location.search]);
    
    const handlePageChange = (page) => {
        const queryParams = {
            page: page,
            pageSize: form.pageSize,
            search: form.searchQuery || undefined,
            sorting: form.sorting || undefined,
            minTime: form.minReadingTime || undefined,
            onlyMyCommunities: form.onlyMyCommunities || undefined,
            maxTime: form.maxReadingTime || undefined,
        };
        
        Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
        
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        
        const tagsQueryString = Array.isArray(form.tags) && form.tags.length > 0
            ? form.tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&') : '';
        
        const cleanedTagsQueryString = tagsQueryString.replace(/&undefined/g, '');
        
        navigate(`/?${queryString}${cleanedTagsQueryString ? `&${cleanedTagsQueryString}` : ''}`);
    };
    
    const handleTagsChange = async (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        const idTags = await tagConverterNameToId(selectedValues);
        setForm({...form, tags: idTags});
    };
    
    const handleWritePost = () => {
        navigate('/post/create');
    }
    
    if (!posts || !posts.length) {
        setLoading(true);
    }
    
    if (posts.posts) {
        setLoading(false);
    }
    
    if (loading) {
        return LoadingComponent();
    }
    
    return (
        <div style={{maxWidth: "92vw"}}>
            <div className="d-flex justify-content-between align-items-center">
                <h1></h1>
                {authenticated &&
                    (<button className="btn btn-primary" onClick={handleWritePost}>Написать пост</button>)
                }
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
                            value={form.searchQuery}
                        />
                    </div>
                    <div className="p-2 flex-fill bd-highlight">
                        <TagSelect handleTagsChange={handleTagsChange} arrayTagsId={searchParams.getAll('tags')}/>
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
                            onChange={e => setForm({...form, sorting: e.currentTarget.value})}
                            value={form.sorting}
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
                            value={form.minReadingTime}
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
                            value={form.maxReadingTime}
                        />
                    </div>
                    {authenticated && (<div className="d-flex flex-column">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={form.onlyMyCommunities}
                                id="flexCheckDefault"
                                onClick={e => setForm({...form, onlyMyCommunities: e.currentTarget.checked})}
                            />
                            <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                Только мои группы
                            </label>
                        </div>
                    </div>)}
                    <div className="d-flex flex-column ">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handlePageChange(1)
                            }}
                        >
                            Применить
                        </button>
                    </div>
                </div>
            </div>
            
            {posts && posts.posts && posts.posts.length > 0 ? (
                <div>
                    <div>
                        {posts.posts.map(post => <PostElement key={post.id} posts={post}/>)}
                    </div>
                    
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
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;