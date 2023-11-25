import formatDateTime from "../../../util/FormatDateTime";
import React, {useState} from "react";

const Comment = ({ comment }) => {
    const [fullComments, setFullComments] = useState(false);
    
    console.log(comment);
    const toggleText = () => {
        setFullComments(!fullComments);
    };
    
    return (
        <div key={comment.id}>
            <p>{comment.author}</p>
            <p>{comment.content}</p>
            {<p>{formatDateTime(comment.createTime)}</p>}
            <button
                className="btn btn-link text-primary p-0"
                onClick={toggleText}
            >
                {fullComments ? 'Скрыть' : 'Раскрыть ответы'}
            </button>
            <hr />
        </div>
    );
}

export default Comment;