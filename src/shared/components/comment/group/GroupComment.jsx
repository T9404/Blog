import ConcreteComment from "../concrete/ConcreteComment";
import {useEffect} from "react";

const GroupComment = ({post, updatePost}) => {
    
    useEffect(() => {
        console.log("GroupComment")
    }, []);
    
    return (
        <div>
            <h3>Комментарии</h3>
            {post.comments.map((comment) => (
                <ConcreteComment comment={comment} postId={post.id} updatePost={updatePost}  />
            ))}
        </div>
    );
}

export default GroupComment;