import React, {useState} from 'react';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from "@material-ui/core";

import Avatar from '@material-ui/core/Avatar';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

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

export default function Comment(props) {
    const classes = useStyles();

    const [likeColor, setLikeColor] = useState('grey');
    const [dislikeColor, setDislikeColor] = useState('grey');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(props.comment.likes);
    const [dislikes, setDislikes] = useState(props.comment.dislikes);

    const nestedComments = (props.comment.children || []).map(comment => {
        return <Comment comment={comment} type="child" />
    })

    const setDislike = () => {     
        if(dislikeColor === 'grey') {
            setDislikeColor('blue');
        }
        else {
            setDislikeColor('grey');
        }
        setDisliked(!disliked);
        if(disliked) {
            setDislikes(dislikes - 1)
            props.comment.likes = dislikes - 1;
        }
        else {
            setDislikes(dislikes + 1);
            props.comment.likes = dislikes + 1;
        }
    }

    const setLike = () => {
        if(likeColor === 'grey') {
            setLikeColor('blue');
        }
        else {
            setLikeColor('grey');
        }   
        setLiked(!liked);
        if(liked) {
            setLikes(likes - 1)
            props.comment.likes = likes - 1;
        }  
        else {
            setLikes(likes + 1);
            props.comment.likes = likes + 1;
        }
    }

    const handleLike = () => {
        
        if (disliked) {
            setLike();
            setDislike();
        }
        setLike();
    }
    
    const handleDislike = () => {
        
        if (liked) {
          setDislike();
          setLike();
        }
        setDislike();
    }
    
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
                    <Typography variant="body1" align="justify" paragraph="true">
                        {props.comment.body}
                        <Grid item xs container direction="row">
                            <Grid item>        
                                <Typography variant="subtitle2" className={classes.iconText}>
                                {likes} 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ThumbUpIcon id={props.comment.id} fontSize="small" style={{color: likeColor}} className={classes.postIcons} onClick={handleLike}/>
                            </Grid>
                            <Grid item>        
                                <Typography variant="subtitle2" className={classes.iconText}>
                                {dislikes} 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ThumbDownIcon id={props.comment.id} fontSize="small" style={{color: dislikeColor}} className={classes.postIcons} onClick={handleDislike}/>
                            </Grid>
                            <Grid item>
                                <CommentIcon id={props.comment.id} fontSize="small" className={classes.postIcons}/>
                            </Grid>
                        </Grid>
                        {nestedComments}
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}