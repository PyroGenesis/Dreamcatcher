import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CommentTree from '../components/comment-tree'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import { useState } from 'react';
// import {firestore} from '../components/firebase'

const useStyles = makeStyles((theme) => ({
    small: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    small_comment: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1.5)
    },
    subtitle: {
      color: grey[500],
      marginLeft: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5)
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
        marginBottom: theme.spacing(1.5)
    }
    
}));

const post = [
    {
      title: 'Really Really long and clickbaity title',
      date: '18 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar',
      likes: 10,
      dislikes: 5
    },
    {
      title: 'Really Really long and clickbaity titles',
      date: '18 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar',
      likes: 10,
      dislikes: 5
    },
    {
      title: 'Really Really long and clickbaity title',
      date: '18 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar',
      likes: 10,
      dislikes: 5
    }
]

export const thread = [
    {
        id: 1,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel finibus enim, ut bibendum dolor. Phasellus arcu justo, bibendum ut mauris id, elementum consectetur nisi. Integer feugiat urna sit amet vehicula dignissim. Nam tempus nunc et diam lobortis pretium. Duis imperdiet mollis iaculis. Fusce semper metus massa, sit amet dignissim felis lacinia non. Donec tristique leo ipsum, bibendum sagittis metus luctus sit amet. Duis sed feugiat ligula. Nam malesuada nunc felis, non convallis augue gravida ut. Ut congue, augue accumsan imperdiet congue, orci mi iaculis metus, egestas mattis urna nibh eget nulla. Donec arcu urna, egestas vitae ante id, tempus tempus leo. ',
        likes: 11,
        dislikes: 6,
    },
    {
        id: 2,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Nullam imperdiet ac neque et aliquam. Maecenas nunc nibh, eleifend id tristique vitae, placerat a dolor. Suspendisse sed urna eu sem egestas lacinia. Etiam eleifend dignissim quam id gravida. Praesent congue urna ac scelerisque dignissim. Aenean vulputate in lacus id accumsan. Donec laoreet arcu eget lacus tincidunt feugiat. Sed dignissim ex eu efficitur egestas. Curabitur tincidunt convallis nulla quis consectetur. Duis pharetra elementum volutpat. Proin tristique ipsum et arcu tempus, id dignissim mauris bibendum. Cras ex leo, hendrerit non faucibus a, maximus vitae ligula. Morbi nunc sapien, auctor eget urna consectetur, mollis dignissim massa. Donec nunc sapien, euismod ac arcu eu, semper auctor libero.',
        likes: 12,
        dislikes: 7,
    },
    {
        id: 3,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Nunc quis odio purus. Nullam semper lacus massa, at efficitur velit iaculis eu. Sed feugiat consectetur cursus. Sed mattis quam in augue sagittis, a vestibulum purus viverra. Sed lacinia sem et sapien vestibulum faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tristique semper vulputate. Suspendisse potenti. Proin tincidunt, lorem et ornare lobortis, turpis nunc consectetur massa, ut consequat nibh mi ac ipsum. Duis malesuada massa dui, et iaculis dolor ornare ut. Morbi pharetra quam eu lectus congue dictum. Quisque blandit, ante volutpat sodales venenatis, turpis ligula rhoncus dolor, vitae maximus tellus neque et urna. Nullam viverra ex sit amet ultricies elementum. ',
        likes: 13,
        dislikes: 8,
    },                    
    {
        id: 4,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Proin accumsan turpis ac leo sollicitudin, vitae mattis libero posuere. Proin sed nisi eu ipsum elementum congue id vel arcu. Integer congue condimentum ante. Duis maximus nisl purus, varius tincidunt velit mattis aliquam. Sed lobortis enim id mauris egestas rutrum. Ut ut eros porttitor, varius metus nec, tincidunt ligula. Aliquam sit amet turpis a felis consequat viverra quis sed massa. Integer turpis ligula, cursus at quam et, varius commodo elit. Fusce lacinia velit eget vehicula lacinia. Ut hendrerit vulputate nulla, et faucibus massa auctor et. Cras non quam sit amet quam ultrices pulvinar id ut sapien. Nulla lobortis neque at pellentesque consectetur. Aenean lobortis augue nec quam viverra, non accumsan eros dictum. ',
        likes: 14,
        dislikes: 9,
    },  
    {
        id: 5,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Donec sollicitudin enim id massa pretium laoreet. Aliquam placerat ac ante ac commodo. Aliquam eros purus, vestibulum a commodo sit amet, aliquet sit amet arcu. Aenean condimentum leo vitae turpis ultricies sagittis. In consequat diam purus, sit amet ullamcorper est iaculis ut. Pellentesque in augue ornare, convallis enim eu, aliquet felis. In cursus, dui in malesuada placerat, enim odio molestie arcu, id ornare nunc dolor ut metus. Fusce quis massa eu sapien rutrum efficitur sed id orci. Praesent massa nulla, placerat ac nisi in, maximus sodales massa. ',
        likes: 15,
        dislikes: 10,
    },
    {
        id: 6,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Praesent molestie neque eu nisi mollis aliquet eget a odio. Curabitur molestie molestie fermentum. Nulla vitae eros vulputate, porttitor arcu in, sollicitudin risus. Suspendisse felis erat, mollis vel ipsum hendrerit, gravida pulvinar nisl. Morbi gravida lectus id maximus fringilla. Phasellus sed tortor enim. Suspendisse ac feugiat tellus. In dapibus nibh metus, suscipit blandit tortor cursus eget. Phasellus rutrum ipsum odio, in consectetur tortor cursus accumsan. In metus nunc, commodo non leo a, tempor pretium dolor. ',
        likes: 16,
        dislikes: 11
    }, 
    {
        id: 7,
        date: '18 December, 2020',
        time: '12:00pm',
        userName: 'yukulkar',
        body: 'Sed id blandit sapien. Fusce blandit velit suscipit tincidunt ornare. Pellentesque vulputate fringilla mi, in faucibus velit hendrerit nec. Vestibulum bibendum velit eu fermentum tempus. Phasellus elementum, justo at ultricies convallis, justo metus suscipit odio, vitae interdum sapien risus eu risus. Vivamus egestas, libero vel dictum facilisis, nunc ligula gravida ipsum, ac vehicula velit felis a enim. Sed ac turpis turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent vitae dapibus sapien. Curabitur aliquam volutpat ipsum, in gravida arcu porta vulputate. Nunc id nibh pharetra, cursus eros eu, mattis ipsum. Nulla pharetra, lorem eget viverra tincidunt, dolor eros ullamcorper quam, ut condimentum risus urna eget purus. Nulla nec ullamcorper purus. ',
        likes: 16,
        dislikes: 11
    }
]

// async function getComments() {
//     const forumReference = firestore.collection('forums');

//     const data = await forumReference.get();

//     if(data.empty) {
//         alert("Error");
//         return;
//     }

//     data.forEach(doc=>{
//         console.log(doc.data());
//     });
// }

function Post(props) {

    const { id } = useParams();

    alert(id);

    const classes = useStyles();

    const [likeColor, setLikeColor] = useState('grey');
    const [dislikeColor, setDislikeColor] = useState('grey');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(post[0].likes);
    const [dislikes, setDislikes] = useState(post[0].dislikes);
    const [showCommentBox, setShowCommentBox] = useState(false);

    const setDislike = () => {     
        if(dislikeColor === 'grey') {
            setDislikeColor('blue');
        }
        else {
            setDislikeColor('grey');
        }
        setDisliked(!disliked);
        disliked ? setDislikes(dislikes - 1) : setDislikes(dislikes + 1);
    }

    const setLike = () => {
        if(likeColor === 'grey') {
            setLikeColor('blue');
        }
        else {
            setLikeColor('grey');
        }   
        setLiked(!liked);
        liked ? setLikes(likes - 1) : setLikes(likes + 1);
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

    // getComments();    

    const addComment = () => {
        setShowCommentBox(showCommentBox => !showCommentBox)
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <Card style={{margin: '20px'}}>
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <Avatar className={classes.small}>{post[0].userName[0]}</Avatar> 
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column">
                                    <Typography variant="h6" className={classes.title}>
                                        {post[0].title}
                                    </Typography>
                                    <Typography variant="subtitle2" className = {classes.subtitle}>
                                        {post[0].userName} • Posted on {post[0].date} at {post[0].time}
                                    </Typography>
                                    <Typography variant="body1" align="justify" paragraph={true}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel finibus enim, ut bibendum dolor. Phasellus arcu justo, bibendum ut mauris id, elementum consectetur nisi. Integer feugiat urna sit amet vehicula dignissim. Nam tempus nunc et diam lobortis pretium. Duis imperdiet mollis iaculis. Fusce semper metus massa, sit amet dignissim felis lacinia non. Donec tristique leo ipsum, bibendum sagittis metus luctus sit amet. Duis sed feugiat ligula. Nam malesuada nunc felis, non convallis augue gravida ut. Ut congue, augue accumsan imperdiet congue, orci mi iaculis metus, egestas mattis urna nibh eget nulla. Donec arcu urna, egestas vitae ante id, tempus tempus leo. 
                                    </Typography>
                                    <Grid item xs container direction="row">
                                        <Grid item>        
                                            <Typography variant="subtitle2" className={classes.small_comment}>
                                            {
                                                likes
                                            } 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <ThumbUpIcon fontSize="small" className={classes.postIcons} style={{color: likeColor}} onClick={handleLike}/>
                                        </Grid>
                                        <Grid item>        
                                            <Typography variant="subtitle2" className={classes.small_comment}>
                                            {
                                                dislikes
                                            } 
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <ThumbDownIcon fontSize="small" className={classes.postIcons} style={{color: dislikeColor}} onClick={handleDislike}/>
                                        </Grid>
                                        <Grid item>
                                            <CommentIcon fontSize="small" className={classes.postIcons} onClick={addComment}/>
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider}/>
                                    <Typography variant="h6">
                                        Comments:
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <CommentTree comments={thread} showCommentBox = {showCommentBox}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default withRouter(Post);