import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from "@material-ui/core";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TextField from '@material-ui/core/TextField';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

import firebase from 'firebase/app';
import "firebase/firestore";

import CommentBox from './comment-box';

import {render} from 'react-dom'
import CodeBlock from './code-block';


const useStyles = makeStyles((theme) => ({
    small: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    small_comment: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    subtitle: {
      color: grey[500],
      marginLeft: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5)
    },
    comment_details: {
        color: grey[500],
        marginBottom: theme.spacing(0.5)
      },
    title: {
      marginLeft: theme.spacing(1.5)
    },
    forumCard: {
      margin: '20px', minHeight: '125px', display: "flex", flexDirection: "column", justifyContent: "center"
    },
    divider: {
        marginBottom: theme.spacing(1.5)
    },
    oppositeContent: {
        // TODO: adjust this value accordingly
        flex: 0
    },
    postIcons: {
        color: "grey",
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    iconText: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
    
}));

// let text = `> test  \n  \ntest`

// export default function Comment(props) {
//     render(<ReactMarkdown source={text} />, document.body)
// }

export default function Comment(props) {
    const classes = useStyles();

    // console.log(props.comment)

    const [likeColor, setLikeColor] = useState(props.comment.likeColor);
    const [dislikeColor, setDislikeColor] = useState(props.comment.dislikeColor);
    const [liked, setLiked] = useState(props.comment.liked);
    const [disliked, setDisliked] = useState(props.comment.disliked);
    const [likes, setLikes] = useState(props.comment.likes);
    const [dislikes, setDislikes] = useState(props.comment.dislikes);

    // const [likeColor, setLikeColor] = useState('grey');
    // const [dislikeColor, setDislikeColor] = useState('grey');
    // const [liked, setLiked] = useState(false);
    // const [disliked, setDisliked] = useState(false);
    // const [likes, setLikes] = useState(props.comment.likes);
    // const [dislikes, setDislikes] = useState(props.comment.dislikes);
    

    const [showCommentBox, setShowCommentBox] = useState(false);
    
    const [likeArray, setLikeArray] = useState(props.comment.likeArray)
    const [dislikeArray, setDislikeArray] = useState(props.comment.dislikeArray)
    const [firstRender, setFirstRender] = useState(true);

    // useEffect(() => {
    //     if(firstRender) {
    //         if(props.comment.likeArray.includes(props.username) && liked !== true) {
    //             console.log("here1")
    //             setLiked(true);
    //             setLikeColor("blue");
    //         }
        
    //         if(props.comment.dislikeArray.includes(props.username) && disliked !== true) {
    //             console.log("here2")
    //             setDisliked(true);
    //             setDislikeColor("blue");
    //         }   
    //         setFirstRender(false)
    //     } ;
    // })

    
    // const nestedComments = (props.comment.children || []).map(comment => {
    //     return <Comment comment={comment} type="child" />
    // })

    const likesCounterIncrement = firebase.firestore.FieldValue.increment(1);
    const dislikesCounterIncrement = firebase.firestore.FieldValue.increment(1);

    const likesCounterDecrement = firebase.firestore.FieldValue.increment(-1);
    const dislikesCounterDecrement = firebase.firestore.FieldValue.increment(-1);
    
    const db = firebase.firestore();

    const addCommentBox = () => {
        setShowCommentBox(showCommentBox => !showCommentBox);    
    }

    const setDislike = async() => {     
        if(dislikeColor === 'grey') {
            setDislikeColor('blue');
        }
        else {
            setDislikeColor('grey');
        }

        const commentRef = db.collection('forums').doc(props.postId).collection('replies').doc(props.comment.id)

        if(disliked) {

            const newDislikeArray = dislikeArray.filter(e => e !== props.username)

            commentRef.set({ dislikes: dislikesCounterDecrement, dislikeArray: newDislikeArray }, { merge: true }).then(()=>{
                setDislikeArray(newDislikeArray)

                setDislikes(dislikes - 1);
                props.comment.dislikes = dislikes - 1;
                
                props.comment.disliked = false;
                props.comment.dislikeColor = 'grey'
                props.comment.dislikeArray = newDislikeArray
            })
        }
        else {

            dislikeArray.push(props.username)
            
            commentRef.set({ dislikes: dislikesCounterIncrement, dislikeArray: dislikeArray }, {merge: true}).then(()=>{
                setDislikeArray(dislikeArray)

                setDislikes(dislikes + 1);
                props.comment.dislikes = dislikes + 1;
                
                props.comment.disliked = true;
                props.comment.dislikeColor = 'blue'  
                props.comment.dislikeArray = dislikeArray  
            })
        }
        setDisliked(!disliked);
        // console.log(disliked) 
        // if(disliked) {
        //     // alert(props.comment.id)

        //     const commentRef = db.collection('forums').doc(props.postId).collection('replies').doc(props.comment.id)
            
        //     const newDislikeArray = dislikeArray.filter(e => e !== props.username)
        //     // commentRef.update({ dislikes: dislikesCounterDecrement })
        //     commentRef.set({ dislikes: dislikesCounterDecrement, dislikeArray: newDislikeArray }, { merge: true })
            
        //     setDislikes(dislikes - 1)
        //     setDislikeArray(newDislikeArray)

        //     props.comment.likes = dislikes - 1;
        // }
        // else {
        //     // alert(props.comment.id)

        //     const commentRef = db.collection('forums').doc(props.postId).collection('replies').doc(props.comment.id)

        //     dislikeArray.push(props.username)
            
        //     // commentRef.update({ dislikes: dislikesCounterIncrement })
        //     commentRef.set({ dislikes: dislikesCounterIncrement, dislikeArray: dislikeArray }, {merge: true})
            
        //     setDislikes(dislikes + 1);
        //     setDislikeArray(dislikeArray)
        //     props.comment.likes = dislikes + 1;
        // }
        // setDisliked(!disliked);
        // console.log(disliked) 
    }

    const setLike = async() => {
        if(likeColor === 'grey') {
            setLikeColor('blue');
        }
        else {
            setLikeColor('grey');
        } 

        const commentRef = db.collection('forums').doc(props.postId).collection('replies').doc(props.comment.id)

        if(liked) {

            const newLikeArray = likeArray.filter(e => e !== props.username)

            commentRef.set({ likes: likesCounterDecrement, likeArray: newLikeArray },{merge:true}).then(()=>{
                setLikeArray(newLikeArray)
                setLikes(likes - 1);
                props.comment.likes = likes - 1;
    
                props.comment.liked = false;
                props.comment.likeColor = 'grey'
                props.comment.likeArray = newLikeArray
            })
        }
        else {

            likeArray.push(props.username)

            commentRef.set({ likes: likesCounterIncrement, likeArray: likeArray }, {merge:true}).then(()=>{
                setLikeArray(likeArray)
                setLikes(likes + 1);
                props.comment.likes = likes + 1;
    
                props.comment.liked = true;
                props.comment.likeColor = 'blue'
                props.comment.likeArray = likeArray
            })
        }  
        setLiked(!liked);
        // console.log(liked) 

        // const commentRef = db.collection('forums').doc(props.postId).collection('replies').doc(props.comment.id)

        // if(liked) {
        //     // alert(props.comment.id)
        //     //commentRef.update({ likes: likesCounterDecrement })
        //     const newLikeArray = likeArray.filter(e => e !== props.username)

        //     commentRef.set({ likes: likesCounterDecrement, likeArray: newLikeArray },{merge:true})

        //     setLikes(likes - 1)            
        //     setLikeArray(newLikeArray)

        //     props.comment.likes = likes - 1;
        // }  
        // else {
        //     // alert(props.comment.id)
        //     //commentRef.update({ likes: likesCounterIncrement })
        //     likeArray.push(props.username)

        //     commentRef.set({ likes: likesCounterIncrement, likeArray: likeArray }, {merge:true})

        //     setLikes(likes + 1);
        //     setLikeArray(likeArray)
        //     props.comment.likes = likes + 1;

        // }
        // setLiked(!liked);
        // console.log(liked) 
    }

    const handleLike = async() => {
        
        if (disliked) {
            // setLike();
            setDislike();
        }
        setLike();
    }
    
    const handleDislike = async() => {
        
        if (liked) {
          // setDislike();
          setLike();
        }
        setDislike();
    }

    // console.log(props.comment)

    // let quoteBody = props.comment.body.substring(1, props.comment.body.lastIndexOf('`'))

    // let body = props.comment.body.substring(props.comment.body.lastIndexOf('`') + 1, props.comment.body.length);

    return (
        <Timeline>
            <TimelineItem>
                <TimelineOppositeContent className={classes.oppositeContent}/>
                <TimelineSeparator>
                    <TimelineDot>
                        <Avatar className={classes.small_comment}>{props.comment.userName[0]}</Avatar> 
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>        
                    <Typography variant="subtitle2" className={classes.comment_details}>
                        {props.comment.userName} • Posted on {props.comment.date} at {props.comment.time}
                    </Typography>
                    {/* {
                        quoteBody.length > 1 ? <div> 
                            <Timeline>
                                <TimelineItem>
                                    <TimelineOppositeContent className={classes.oppositeContent}/>
                                        <TimelineSeparator>
                                            <TimelineConnector /> 
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography variant="subtitle2" style={{color: grey[500]}} align="justify">
                                                {quoteBody}
                                            </Typography>
                                        </TimelineContent>
                                </TimelineItem>
                            </Timeline> 
                        </div> : null
                    } */}
                    {/* <Typography variant="body1" align="justify" paragraph={true}>
                        {body}
                    </Typography> */}
                    <Typography variant="body1" align="justify" paragraph={true}>       
                        <ReactMarkdown>
                            {props.comment.body}
                        </ReactMarkdown>
                    </Typography>
                    {/* <ReactMarkdown source={'Test  \nTest  \nTest'} /> */}
                    <Grid item xs container direction="row">
                        <Grid item>        
                            <Typography variant="subtitle2" className={classes.iconText}>
                            {likes} 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ThumbUpIcon id={props.comment.id} fontSize="small" style={{color: likeColor}} className={classes.postIcons} onClick={()=>handleLike()}/>
                        </Grid>
                        <Grid item>        
                            <Typography variant="subtitle2" className={classes.iconText}>
                            {dislikes} 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ThumbDownIcon id={props.comment.id} fontSize="small" style={{color: dislikeColor}} className={classes.postIcons} onClick={()=>handleDislike()}/>
                        </Grid>
                        <Grid item>
                            <CommentIcon id={props.comment.id} fontSize="small" className={classes.postIcons} onClick={addCommentBox}/>
                        </Grid>
                    </Grid>
                    { showCommentBox ? <CommentBox comment={props.comment} postId={props.postId} username={props.username} postComment={false} updateCommentThread={props.updateCommentThread}/> : null }
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}