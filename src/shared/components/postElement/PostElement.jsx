import {useState} from "react";
import formatDateTime from "../../../util/FormatDateTime";
import styles from './style.module.css';
import {useNavigate} from "react-router-dom";
import LikeComponent from "../like/LikeComponent";

function PostElement({ posts }) {
    const navigate = useNavigate();
    const [showFullText, setShowFullText] = useState(false);
    
    const toggleText = () => {
        setShowFullText(!showFullText);
    };
    
    const handleTitleClick = () => {
        navigate(`/post/${posts.id}`);
    }
    
    const handleCommentClick = () => {
        navigate(`/post/${posts.id}#comments`);
    }
    
    return (
        <div className="card p-3 m-2">
            <p>
                {posts.author} - {formatDateTime(posts.createTime)}
                {posts.communityName && ` в сообществе "${posts.communityName}"`}
            </p>
            <h4 className={styles.link} onClick={handleTitleClick}>{posts.title}</h4>
            {showFullText ? (
                <p>{posts.description}</p>
            ) : (
                <p>{posts.description.substring(0, 1000)}...</p>
            )}
            {posts.description.length > 1000 && (
                <div className="d-grid gap-2 d-md-block">
                    <button
                        className="btn btn-link text-primary p-0"
                        onClick={toggleText}
                    >
                        {showFullText ? 'Скрыть' : 'Читать полностью'}
                    </button>
                </div>
            )}
            
            <div>{posts.tags.map((tag) => (
                <span className={styles.grayText} key={tag.id}>#{tag.name} </span>
            ))}
            </div>
            <div className={`time-reading`}>
                <p>Время чтения {posts.readingTime} мин.</p>
            </div>
            
            <div className="card-header d-sm-flex justify-content-between">
                <p className={`${styles.link}mb-0`} onClick={handleCommentClick}>&#128172; {posts.commentsCount}</p>
                <LikeComponent post={posts} />
            </div>
        </div>
    );
}

export default PostElement;