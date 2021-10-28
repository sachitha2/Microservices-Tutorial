import React from 'react';
function CommentList({comments}) {
    
    const renderComments = () => {
        return comments.map(comment => {
            let content;
            if (comment.status === 'approved') {
                content = comment.content;
            } 

            if(comment.status === 'pending') {
                content = 'This comment is awaiting moderation';
            }

            if(comment.status === 'rejected') {
                content = 'This comment has been rejected';
            }
            return (
                <li key={comment.id}>
                    {content}
                </li>
            );
        }
        )
    }
    return (
        <div>
            <ul>
                {renderComments()}
            </ul>
        </div>
    )
}

export default CommentList
