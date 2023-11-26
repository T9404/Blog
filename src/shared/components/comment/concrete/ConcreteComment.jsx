import { useEffect, useState } from 'react';
import formatDateTime from "../../../../util/FormatDateTime";
import getSubComments from "../../../api/comment/GetSubComments";
import createComment from "../../../api/comment/CreateComment";
import {useNavigate} from "react-router-dom";
import getProfile from "../../../api/profile/GetProfile";
import editComment from "../../../api/comment/EditComment";
import styles from './style.module.css';
import deleteComment from "../../../api/comment/DeleteComment";

const ConcreteComment = ({ comment, postId, isNested }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [subComments, setSubComments] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [userFullName, setUserFullName] = useState('');
    
    const [replyContent, setReplyContent] = useState('');
    
    const [editContent, setEditContent] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    
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
        const fetchProfile = async () => {
            try {
                const user = await getProfile();
                setUserFullName(user.fullName);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        
        fetchProfile();
    }, []);
    
    useEffect(() => {
        if (showEditForm) {
            setEditContent(comment.content);
        } else {
            setEditContent('');
        }
    }, [showEditForm, comment.content]);
    
    
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
        console.log(postId, replyContent, comment.id);
        try {
            await createComment(postId, replyContent, comment.id);
            setShowReplyForm(!showReplyForm);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }
    
    const handleEditSubmit = async (e) => {
        setShowEditForm(!showEditForm);
        
        try {
            await editComment(comment.id, editContent);
            setShowEditForm(!showEditForm);
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    }
    
    const handleDeleteSubmit = async (e) => {
        try {
            await deleteComment(comment.id);
        } catch (error) {
            localStorage.clear();
            navigate('/login');
        }
    }
    
    return (
        <div key={comment.id} className={isNested ? "p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end" : ''}>
            <p>{comment.deleteDate != null ? '[Комментарий удален]' : comment.author}</p>
            <p>{comment.deleteDate != null ? '[Комментарий удален]' : comment.content}
                {comment.deleteDate == null && comment.modifiedDate && <span className={styles.grayText}>(изменено)</span>}</p>
            <div className="d-sm-flex justify-content-between">
                {comment.createTime && <p>{formatDateTime(comment.createTime)}</p>}
                
                <div className="d-flex flex-row bd-highlight mb-3">
                <button type="button" className={`${styles.blueText} btn btn-unstyled p-2 bd-highlight`}
                        onClick={e => setShowReplyForm(!showReplyForm)}>{showReplyForm ? 'Отменить' : 'Ответить'}</button>
                    
                    {userFullName === comment.author && (<button type="button" className="btn btn-unstyled p-2 bd-highlight"
                                                                 onClick={e => setShowEditForm(!showEditForm)}>{'✏'}</button>
                        )}
                    {userFullName === comment.author && (<button type="button" className="btn btn-unstyled p-2 bd-highlight"
                                                                onClick={handleDeleteSubmit}>🗑</button>)}
                </div>
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
            
            {showEditForm && (
                <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                        <label htmlFor={`editContent-${comment.id}`} className="form-label">
                            Редактирование комментария {comment.author}:
                        </label>
                        <textarea
                            className="form-control"
                            id={`editContent-${comment.id}`}
                            rows="3"
                            onChange={e => setEditContent(e.target.value)}
                            value={editContent}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Изменить ответ
                    </button>
                </form>
            )}
            
            {comment.subComments > 0 && !isNested && (
                <button
                    className={`${styles.blueText} btn btn-unstyled text-primary p-0`}
                    onClick={toggleText}
                >
                    {expanded ? 'Скрыть' : 'Раскрыть ответы'}
                </button>
            )}
            
            {expanded && subComments.length > 0 &&
                subComments.map((subComment) => (
                    <ConcreteComment key={subComment.id} comment={subComment} postId={postId} isNested={true} />
                ))}
            <hr/>
        </div>
    );
};

export default ConcreteComment;