import React from 'react';

import Comment from './comment';

export default function CommentTree(props) {

    return (
        <div>
            {
                props.comments.map((comment) => {
                    return (
                        <Comment comment={comment} /> 
                    )
                })
            }
        </div>
    )
}