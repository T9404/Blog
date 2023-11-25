import { useEffect, useState } from 'react';
import formatDateTime from "../../../util/FormatDateTime";
import getSubComments from "../../api/comment/GetSubComments";
import createComment from "../../api/comment/CreateComment";
import {useNavigate} from "react-router-dom";

const Comment = ({ comment, postId }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [subComments, setSubComments] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    
    const toggleText = async () => {
        setExpanded(!expanded);
        
        if (!expanded) {
            try {
                const data = await getSubComments(comment.id);
                setSubComments(data);
            } catch (error) {
                console.error('Error fetching sub-comments:', error);
            }
        }
    };
    
    useEffect(() => {
        const fetchSubComments = async () => {
            try {
                const data = await getSubComments(comment.id);
                setSubComments(data);
            } catch (error) {
                console.error('Error fetching sub-comments:', error);
            }
        };
        
        if (expanded && comment.subComments > 0) {
            fetchSubComments();
        }
    }, [comment.id, expanded, comment.subComments]);
    
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        
        if (replyContent.length > 0) {
            console.log(replyContent);
        }
        
        try {
            await createComment(postId, replyContent, comment.id);
            setShowReplyForm(!showReplyForm);
        } catch (error) {
            localStorage.clear();
            navigate('/login');
        }
    }
    
    return (
        <div key={comment.id}>
            <p>{comment.author}</p>
            <p>{comment.id}</p>
            <p>{comment.content}</p>
            <div className="d-sm-flex justify-content-between">
                {comment.createTime && <p>{formatDateTime(comment.createTime)}</p>}
                <button type="button" className="btn btn-link"
                        onClick={e => setShowReplyForm(!showReplyForm)}>{showReplyForm ? 'Отменить' : 'Ответить'}</button>
            </div>
            
            {showReplyForm && (
                <form onSubmit={handleReplySubmit}>
                    <div className="mb-3">
                        <label htmlFor={`replyContent-${comment.id}`} className="form-label">
                            Ответ на комментарий {comment.author}:
                        </label>
                        <textarea
                            className="form-control"
                            id={`replyContent-${comment.id}`}
                            rows="3"
                            onChange={e => setReplyContent(e.target.value)}
                            value={replyContent}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Отправить ответ
                    </button>
                </form>
            )}
            
            {comment.subComments > 0 && (
                <button
                    className="btn btn-link text-primary p-0"
                    onClick={toggleText}
                >
                    {expanded ? 'Скрыть' : 'Раскрыть ответы'}
                </button>
            )}
            
            {expanded && subComments.length > 0 &&
                subComments.map((subComment) => (
                    <Comment key={subComment.id} comment={subComment} />
                ))}
            <hr />
        </div>
    );
};

export default Comment;