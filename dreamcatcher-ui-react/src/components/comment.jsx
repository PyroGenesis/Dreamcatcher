import React from 'react';
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

    const nestedComments = (props.comment.children || []).map(comment => {
        return <Comment comment={comment} type="child" />
    })
    
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
                                {props.comment.likes} 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ThumbUpIcon fontSize="small" className={classes.postIcons}/>
                            </Grid>
                            <Grid item>        
                                <Typography variant="subtitle2" className={classes.iconText}>
                                {props.comment.dislikes} 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ThumbDownIcon fontSize="small" className={classes.postIcons}/>
                            </Grid>
                            <Grid item>
                                <CommentIcon fontSize="small" className={classes.postIcons}/>
                            </Grid>
                        </Grid>
                        {nestedComments}
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}