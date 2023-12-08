import {useState} from "react";
import addLike from "../../api/like/AddLike";
import deleteLike from "../../api/like/DeleteLike";
import {useNavigate} from "react-router-dom";
import notifyError from "../../../util/notification/error/ErrorNotify";

const LikeComponent= ({ post }) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(post.hasLike);
    const [likesCount, setLikesCount] = useState(post.likes);
    
    const handleLikeClick = async () => {
        try {
            if (isLiked) {
                await deleteLike(post.id)
            } else {
                await addLike(post.id)
            }
            setIsLiked(!isLiked);
            setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        } catch (error) {
            if (error.response.status === 401) {
                notifyError('Вы не авторизованы, пожалуйста, войдите заново')
                localStorage.clear();
                navigate('/login');
            }
        }
    }
    return (
        <button className="btn" onClick={handleLikeClick}>
            {isLiked ? '❤️' : '🤍'} {likesCount}
        </button>
    )
}

export default LikeComponent;