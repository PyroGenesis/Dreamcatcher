import React, {useState} from "react";

import { Typography, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import MEDitor, {commands} from "@uiw/react-md-editor"
import FormHelperText from '@material-ui/core/FormHelperText';

import firebase from 'firebase/app';
import "firebase/firestore";

function getCurrentDateTime() {
    let today = new Date()

    let day = String(today.getDate()).padStart(2, '0');

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[today.getMonth()]

    let year = today.getFullYear()

    const hour = today.getHours()
    const minutes = String(today.getMinutes()).padStart(2, '0')

    const date = `${day} ${month}, ${year}`
    const time = `${hour}:${minutes}`

    return [date, time]
}

export default function CommentBox(props) {

    const [body, updateBody] = useState('');
    const [commentError, setCommentError] = useState('')

    const [date, time] = getCurrentDateTime();

    const db = firebase.firestore();

    // console.log(time);

    const validateInput = () => {
        
        let isError = false;

        const errors = {
            commentError: ''
        }

        if(body.length < 3) {
            isError = true;
            errors.commentError = 'Comment body must be atleast 3 characters long'
        }

        setCommentError(errors.commentError);
        
        return isError;
    }

    const addComment = async() => {

        // console.log(body)

        const err = validateInput()

        if(!err) {
            let quotedBody;

            if(props.postComment) {
                quotedBody = body;            
                console.log(quotedBody)
            }
            else {
                // if(props.comment.body[0] === '`') {
                    console.log(props.comment.body)
                if(props.comment.body[0] === '>') {
                    // quotedBody = props.comment.body.substring(0, props.comment.body.lastIndexOf('`')) + props.comment.body.substring(props.comment.body.lastIndexOf('`')+1, props.comment.body.length) + '`' + body
                    // quotedBody = '`' + props.comment.body.substring(props.comment.body.lastIndexOf('`') + 1, props.comment.body.length) + '`' + body
                    quotedBody = `> ${props.comment.body.substring(props.comment.body.lastIndexOf('\n')+1)}  \n  \n${body}`;
                    // console.log(quotedBody)
                }
                else {
                    // quotedBody = '`' + props.comment.body + '`' + body;
                    quotedBody = `> ${props.comment.body}  \n  \n${body}`;
                }
            }
    
            const repliesRef = db.collection('forums').doc(props.postId).collection('replies').doc()
    
            const firebaseDate = firebase.firestore.FieldValue.serverTimestamp();
    
            repliesRef.set(
                {  
                    username: props.username,
                    body: quotedBody,
                    date: firebaseDate,
                    likes: 0,
                    dislikes: 0,
                    likeArray: [],
                    dislikeArray: []
                }
            ).then(() => {
                props.updateCommentThread(
                    {
                        id: repliesRef.id,
                        date: date,
                        time: time,
                        userName: props.username,
                        body: quotedBody,
                        likes: 0,
                        dislikes: 0,
                        likeArray: [],
                        dislikeArray: [],
                        liked: false,
                        disliked: false,
                        likeColor: 'grey',
                        dislikeColor: 'grey'
                    }
                );
            })
    
            props.updateCommentThread({
                id: repliesRef.id,
                date: date,
                time: time,
                userName: props.username,
                body: quotedBody,
                likes: 0,
                dislikes: 0,
                likeArray: [],
                dislikeArray: [],
                liked: false,
                disliked: false,
                likeColor: 'grey',
                dislikeColor: 'grey'
            });
        }
    }

    return (
        <div>
            <Timeline>
                <TimelineContent>
                    {/* <TextField
                        id="standard-full-width"
                        style={{ paddingBottom: 16, marginLeft: 5 }}
                        placeholder="Comment here..."
                        fullWidth
                        value = {body}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {e => updateBody(e.target.value)}
                    /> */}
                    <FormHelperText style={{ paddingBottom: 5 }}>Comment here... (Markdown supported)</FormHelperText>
                    <MEDitor style={{ paddingBottom: 16 }} height={300} value={body} onChange={updateBody} preview={'live'} commands={[commands.codeEdit, commands.codeLive, commands.codePreview]} />
                    <FormHelperText style={{ paddingBottom: 5 }} error={commentError.length === 0 ? false : true}>{commentError}</FormHelperText>
                    <Button size="small" style={{backgroundColor: "#3f51b5", color: "white", marginBottom: -20}} onClick={addComment}>
                        Reply
                    </Button>
                </TimelineContent>
            </Timeline>
        </div>
    )
}