import { useEffect, useState } from 'react';
import timestampToDateTimeConverter from "../../../../util/converter/TimestampToDateTimeConverter";
import getSubComments from "../../../api/comment/GetSubComments";
import createComment from "../../../api/comment/CreateComment";
import {useNavigate} from "react-router-dom";
import getProfile from "../../../api/profile/GetProfile";
import editComment from "../../../api/comment/EditComment";
import styles from './style.module.css';
import deleteComment from "../../../api/comment/DeleteComment";

const ConcreteComment = ({ comment, postId, updatePost, isNested }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [subComments, setSubComments] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [userFullName, setUserFullName] = useState('');
    
    const [replyContent, setReplyContent] = useState('');
    
    const [editContent, setEditContent] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
    
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
        console.log("Subcomments updated:", subComments);
        setForceUpdate(forceUpdate + 1)
    }, [subComments]);
    
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            await createComment(postId, replyContent, comment.id);
            setShowReplyForm(!showReplyForm);
            updatePost();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }
    
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setShowEditForm(!showEditForm);
        try {
            await editComment(comment.id, editContent);
            setShowEditForm(!showEditForm);
            setEditContent('')
            updatePost();
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    }
    
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteComment(comment.id);
            updatePost();
        } catch (error) {
            localStorage.clear();
            navigate('/login');
        }
    }
    
    return (
        <div key={comment.id} className={isNested ? `border-start border-5 border-primary border-opacity-50 ms-5` : ''}>
            <div className="ms-1">
            <p>{comment.deleteDate != null ? '[Комментарий удален]' : comment.author}</p>
            <p>{comment.deleteDate != null ? '[Комментарий удален]' : comment.content}
                {comment.deleteDate == null && comment.modifiedDate && <span className={styles.grayText}>(изменено)</span>}</p>
            <div className="d-sm-flex justify-content-between">
                {comment.createTime && <p>{timestampToDateTimeConverter(comment.createTime)}</p>}
                
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
            </div>
            
            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="ms-1">
                    <div className="mb-3">
                        <label htmlFor={`replyContent-${comment.id}`} className="form-label">
                            Ответ на комментарий {comment.author}:
                        </label>
                        <textarea
                            className="form-control ml-2"
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
                <form onSubmit={handleEditSubmit} className="ms-1">
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
                    <ConcreteComment key={subComment.id} comment={subComment} postId={postId} updatePost={updatePost} isNested={true} />
                ))}
            <hr/>
        </div>
    );
};

export default ConcreteComment;
