import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import formatDateTime from "../../util/FormatDateTime";
import styles from "../../shared/components/postElement/style.module.css";
import {setLoading} from "../../store/reducers/postsSlice";
import getPost from "../../shared/api/posts/Post";
import GroupComments from "../../shared/components/comment/GroupComments";

const IndividualPostPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(location.hash === '#comments');
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data using the getPost function
                const postData = await getPost(id);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);
    
    const handleCommentClick = () => {
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
                <p>{post.description}</p>
                
                <div>{post.tags.map((tag) => (
                    <span className={styles.grayText} key={tag.id}>#{tag.name} </span>
                ))}
                </div>
                <div className={`time-reading`}>
                    <p>Время чтения {post.readingTime} мин.</p>
                </div>
                
                <p>Address in future</p>
                
                <div className="card-header d-sm-flex justify-content-between">
                    <p className={`mb-0`} onClick={handleCommentClick}>&#128172; {post.commentsCount}</p>
                    <p className="mb-0">&#10084;{post.likes}</p>
                </div>
            </div>
            
            <div className="card">
                {showComments && <GroupComments post={post} />}
            </div>
        </>
    );
};

export default IndividualPostPage;