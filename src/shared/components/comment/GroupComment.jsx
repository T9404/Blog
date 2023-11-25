import React, {useState} from "react";
import formatDateTime from "../../../util/FormatDateTime";
import Comment from "./Comment";

const GroupComment = (post) => {
    
    return (
        <div>
            <h3>Комментарии</h3>
            {post.post.comments.map((comment) => (
                <Comment comment={comment} postId={post.post.id} />
            ))}
        </div>
    );
}

export default GroupComment;