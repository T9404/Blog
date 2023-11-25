import React, {useState} from "react";
import formatDateTime from "../../../util/FormatDateTime";
import Comment from "./Comment";

const GroupComments = (post) => {
    
    
    console.log(post.post);
    return (
        <div>
            <h3>Комментарии</h3>
            {post.post.comments.map((comment) => (
                <Comment comment={comment} />
            ))}
        </div>
    );
}

export default GroupComments;