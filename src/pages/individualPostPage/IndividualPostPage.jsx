import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import formatDateTime from "../../util/FormatDateTime";
import styles from "../../shared/components/postElement/style.module.css";
import {setLoading} from "../../store/reducers/postsSlice";
import getPost from "../../shared/api/posts/Post";
import GroupComment from "../../shared/components/comment/group/GroupComment";
import createComment from "../../shared/api/comment/CreateComment";
import LikeComponent from "../../shared/components/like/LikeComponent";
import Address from "../../shared/components/address/Address";
import ConcreteAddress from "../../shared/components/address/Address";

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
    
    
    const handleCreateComment = async () => {
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
        }
    };
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (!post) {
        return <p>Post not found</p>;
    }
    
    return (
        <>
            <div className="card">
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
                
                {post.addressId && <ConcreteAddress objectGuid={post.addressId} />}
                
                <div className="card-header d-sm-flex justify-content-between">
                    <p className={`mb-0`} onClick={handleExpandComments}>&#128172; {post.commentsCount}</p>
                    <LikeComponent post={post} />
                </div>
            </div>
            
            <div className="card">
                {showComments && <GroupComment post={post} />}
            </div>
            
            <div className="card">
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
