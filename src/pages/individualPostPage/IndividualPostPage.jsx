import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import formatDateTime from "../../util/FormatDateTime";
import getPost from "../../shared/api/posts/Post";
import GroupComment from "../../shared/components/comment/group/GroupComment";
import createComment from "../../shared/api/comment/CreateComment";
import LikeComponent from "../../shared/components/like/LikeComponent";
import ConcreteAddress from "../../shared/components/address/Address";
import styles from "./style.module.css";
import notifyError from "../../util/notification/error/ErrorNotify";

const IndividualPostPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(location.hash === '#comments');
    
    const [comment, setComment] = useState('');
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await getPost(id);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id, post]);
    
    const handleExpandComments = () => {
        setShowComments((prevShowComments) => !prevShowComments);
        
        const hashFragment = showComments ? '' : '#comments';
        navigate(`/post/${post.id}${hashFragment}`);
    };
    
    
    useEffect(() => {
        if (showComments) {
            const commentsSection = document.getElementById('comments');
            if (commentsSection) {
                commentsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [showComments]);
    
    
    const handleCreateComment = async (e) => {
        e.preventDefault();
        try {
            const createdComment = await createComment(post.id, comment);
            setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments, createdComment],
                commentsCount: prevPost.commentsCount + 1,
            }));
            setComment('');
        } catch (error) {
            console.error('Error creating comment:', error);
            notifyError('Error creating comment: ' + error.message)
        }
    };
    
    useEffect(() => {
    
    }, [post]);
    
    const updatePost = () => {
        const fetchData = async () => {
            try {
                const postData = await getPost(id);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData().then();
    }
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (!post) {
        return <p>Post not found</p>;
    }
    
    return (
        <>
            <div className="card p-3 m-2">
                <p>
                    {post.author} - {formatDateTime(post.createTime)}
                    {post.communityName && ` в сообществе "${post.communityName}"`}
                </p>
                <h4>{post.title}</h4>
                
                <div className="text-center">
                <img src={post.image} className="rounded img-fluid" alt="picture" />
                </div>
                
                <p>{post.description}</p>
                
                <div>{post.tags.map((tag) => (
                    <span className={styles.grayText} key={tag.id}>#{tag.name} </span>
                ))}
                </div>
                <div className={`time-reading`}>
                    <p>Время чтения {post.readingTime} мин.</p>
                </div>
                
                {post.addressId && (
                    <div className={styles.address}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                        <ConcreteAddress objectGuid={post.addressId} />
                    </div>
                )}
                
                
                <div className="card-header d-sm-flex justify-content-between">
                    <p className={`mb-0`} onClick={handleExpandComments}>&#128172; {post.commentsCount}</p>
                    <LikeComponent post={post} />
                </div>
            </div>
            
            {showComments && post && (
                <div className="card p-3 m-2">
                    <GroupComment post={post} updatePost={updatePost} />
                </div>
            )}
            
            <div className="card p-3 m-2">
                <h3>Оставить комментарий</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Комментарий</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setComment(e.target.value)} value={comment}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCreateComment}>Отправить</button>
                </form>
            </div>
        </>
    );
};

export default IndividualPostPage;
