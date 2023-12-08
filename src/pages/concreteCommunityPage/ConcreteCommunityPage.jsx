import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import getConcreteCommunity from "../../shared/api/community/GetConcreteCommunity";
import SubscribeButton from "../../shared/components/group/SubscribeButton";
import getRole from "../../shared/api/group/GetRole";
import tagConverterNameToId from "../../util/converter/TagConverterNameToId";
import PostElement from "../../shared/components/postElement/PostElement";
import PaginationComponent from "../../shared/components/pagination/PaginationComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroupPosts} from "../../store/action/fetchGroupPosts";
import {setLoading} from "../../store/reducers/postsSlice";
import LoadingComponent from "../../shared/components/loading/Loading";
import TagSelect from "../../shared/components/tagElement/Tag";

const ConcreteCommunityPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [community, setCommunity] = useState();
    const path = process.env.PUBLIC_URL + '/assets/';
    const navigate = useNavigate();
    const [role, setRole] = useState();
    const posts = useSelector((state) => state.groupPosts.data);
    const loading = useSelector((state) => state.groupPosts.loading);
    const location = useLocation();
    
    
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
    
    useEffect( () => {
        const fetchData = async () => {
            try {
                const communityData = await getConcreteCommunity(id);
                setCommunity(communityData);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        }
        
        const fetchRole = async () => {
            try {
                const roleData = await getRole(id);
                setRole(roleData);
            } catch (error) {
                navigate('/login')
                localStorage.clear();
            }
        }
        
        setForm({
            pageSize: Number(searchParams.get('pageSize')) || 5,
            tags: searchParams.getAll('tags') || [],
            sorting: searchParams.get('sorting') || 'CreateDesc'
        });
        
        dispatch(fetchGroupPosts(searchParams, id))
        const page = searchParams.get('page') || 1;
        handlePageChange(page)
        setSearchParams(searchParams);
        
        fetchData();
        fetchRole().then();
    }, [dispatch, location.search]);
    
    const handleSubscriberUpdate = (change) => {
        setCommunity((prevCommunity) => ({
            ...prevCommunity,
            subscribersCount: prevCommunity.subscribersCount + change,
        }));
    };
    
    const isAdministrator = () => {
        return community.administrators.some((admin) => admin.email === localStorage.getItem('email'));
    }
    
    const handleTagsChange = async (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        const idTags = await tagConverterNameToId(selectedValues);
        setForm({...form, tags: idTags});
    };
    
    const handlePageChange = (page) => {
        const queryParams = {
            page: page,
            pageSize: form.pageSize,
            sorting: form.sorting,
        };
        
        Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
        
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        
        const tagsQueryString = Array.isArray(form.tags) && form.tags.length > 0
            ? form.tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&') : '';
        
        const cleanedTagsQueryString = tagsQueryString.replace(/&undefined/g, '');
        
        navigate(`/communities/${id}?${queryString}${cleanedTagsQueryString ? `&${cleanedTagsQueryString}` : ''}`);
    };
    
    if (!posts || !posts.length) {
        setLoading(true);
    }
    
    if (posts.posts) {
        setLoading(false);
    }
    
    if (loading) {
        return LoadingComponent();
    }
    
    const handleWritePost = () => {
        navigate(`/post/create?groupId=${id}`);
    }
    
    return (
        <div style={{maxWidth: "91vw"}}>
            {community && (
                <>
                <div className="border p-3">
                    <div className="card-header d-sm-flex justify-content-between">
                        <h1>Группа {community.name}</h1>
                        <div className="card-header d-sm-flex justify-content-between">
                            {isAdministrator() &&
                                <button
                                    className="btn btn-primary m-1"
                                    onClick={handleWritePost}
                                >Написать пост</button>
                            }
                            <SubscribeButton
                                groupRole={role}
                                groupId={community.id}
                                onUpdateSubscribers={handleSubscriberUpdate}
                            />
                        </div>
                    </div>
                    
                    <p>👥 {community.subscribersCount} подписчиков</p>
                    <p>Тип сообщества: {community.isClosed ? "Закрытое" : "Открытое"}</p>
                    <h3>Администраторы</h3>
                    <div>
                        {community.administrators.map((admin) => (
                            <div className="col-md-4 d-flex align-items-center">
                                <img
                                    src={path + (admin.gender === 'Male' ? 'male.png' : 'female.png')}
                                    className="rounded-circle mr-3 w-25 h-25"
                                    alt="Gender"
                                />
                                <p className="mb-0 ms-3">{admin.fullName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="border p-3">
                    <div>
                        <p>Фильтры</p>
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
                                <TagSelect handleTagsChange={handleTagsChange} arrayTagsId={searchParams.getAll('tags')}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <button
                                type="button"
                                className="btn btn-primary align-self-end w-auto"
                                onClick={() => {handlePageChange(1)}}
                            >
                                Применить
                            </button>
                        </div>
                    </div>
                </div>
                    
                    <div className="border ">
                        {posts && posts.posts && posts.posts.length > 0 ? (
                            <>
                                {<>
                                    {posts.posts.map((post) => (
                                        <PostElement key={post.id} posts={post} />
                                    ))}
                                </>}
                                
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
                                                onChange={(e) =>
                                                    setForm({...form, pageSize: Number(e.currentTarget.value)})}
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
                </>
            )}
        </div>
    );
}

export default ConcreteCommunityPage;