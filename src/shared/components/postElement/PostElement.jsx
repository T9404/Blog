import {useState} from "react";
import formatDateTime from "../../../util/FormatDateTime";
import styles from './style.module.css';

function PostElement({ post }) {
    const [showFullText, setShowFullText] = useState(false);
    
    const toggleText = () => {
        setShowFullText(!showFullText);
    };
    
    return (
        <div className="card">
            <p>
                {post.author} - {formatDateTime(post.createTime)}
                {post.communityName && `в сообществе "${post.communityName}"`}
            </p>
            <h4>{post.title}</h4>
            {showFullText ? (
                <p>{post.description}</p>
            ) : (
                <p>{post.description.substring(0, 1000)}...</p>
            )}
            {post.description.length > 1000 && (
                <div className="d-grid gap-2 d-md-block">
                    <button
                        className="btn btn-link text-primary p-0"
                        onClick={toggleText}
                    >
                        {showFullText ? 'Скрыть' : 'Читать полностью'}
                    </button>
                </div>
            )}
            
            <div>{post.tags.map((tag) => (
                <span className={styles.grayText} key={tag.id}>#{tag.name} </span>
            ))}
            </div>
            <div className={`time-reading`}>
                <p>Время чтения {post.readingTime} мин.</p>
            </div>
            
            <div className="card-header d-sm-flex justify-content-between">
                <p className="mb-0 ">&#128172; {post.commentsCount}</p>
                <p className="mb-0">&#10084;{post.likes}</p>
            </div>
        </div>
    );
}

export default PostElement;