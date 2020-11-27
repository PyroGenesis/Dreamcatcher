import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import CommentBox from './comment-box';
import Comment from './comment';

export default function CommentTree(props) {

    const [comments, updateComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const updateCommentThread = (s) => {
        setLoading(true);
        updateComments([...comments, s]);
    }

    useEffect(() => {
        if(firstRender) {
            updateComments(props.comments);
            setFirstRender(false);
        }
        setLoading(false);       
    })

    if(loading) {    
        return (
            <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress size="20vw" />
            </div>
        )
    }
    else {
        return (
            <div>
                { props.showCommentBox ? <CommentBox comment={comments[comments.length-1]} username={props.username} postId={props.postId} postComment={true} updateCommentThread={updateCommentThread}/> : null }
                {
                    comments.map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment} postId={props.postId} username={props.username} updateCommentThread={updateCommentThread}/> 
                        )
                    })   
                }
            </div>
        )
    }
}