import React, {useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import { useAuthState } from '../context/context';
import firebase from 'firebase/app';
import "firebase/firestore";

function getCurrentDateTime() {
    let today = new Date()

    let day = String(today.getDate()).padStart(2, '0');

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[today.getMonth()]

    let year = today.getFullYear()

    let amOrPm = ''

    let hour = today.getHours()

    hour > 12 ? amOrPm = 'PM' : amOrPm = 'AM'

    if(hour > 12) {
        hour -= 12;
    }

    const minutes = String(today.getMinutes()).padStart(2, '0')

    const date = `${day} ${month}, ${year}`
    const time = `${hour}:${minutes} ${amOrPm}`

    return [date, time]
}


export default function PostDialog(props) {

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [titleError, setTitleError] = useState('')
    const [bodyError, setBodyError] = useState('')

    const userDetails = useAuthState();

    const categories = ["Interview Experiences", "Offer Discussion", "Technical Questions", "General Discussion"]

    const validateInput = () => {

        let isError = false;
        
        const errors = {
            titleError: '',
            bodyError: '',
        };

        if(postTitle.length < 5) {
            isError = true;
            errors.titleError = 'Title must be at least 5 characters long'
        }

        if(postBody.length < 5) {
            isError = true;
            errors.bodyError = 'Body must be at least 5 characters long'
        }
        
        setTitleError(errors.titleError)
        setBodyError(errors.bodyError)

        return isError;
    }
    
    const submitPost = async() => {

        const err = validateInput()
        
        if(!err) {
            const db = firebase.firestore();

            const postRef = db.collection('forums').doc()
            const firebaseDate = firebase.firestore.FieldValue.serverTimestamp();

            const [curDate, curTime] = getCurrentDateTime()
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: userDetails.token })
            }

            const response = await fetch('/auth/getUsername', requestOptions)
            const usernameObj = await response.json()

            // console.log(firebaseDate)

            postRef.set(
                {  
                    category: categories[props.forumNum-1],
                    username: usernameObj.data.username,
                    body: postBody,
                    title: postTitle,
                    date: firebaseDate,
                    likes: 0,
                    dislikes: 0,
                    likeArray: [],
                    dislikeArray: []
                }
            ).then(() => {
                props.addPost({
                    id: postRef.id,
                    username: usernameObj.data.username,
                    body: postBody,
                    title: postTitle,
                    date: curDate,
                    time: curTime,
                    likes: 0,
                    dislikes: 0,
                    likeArray: [],
                    dislikeArray: []
                })
            })

            props.setDialog()
        }
    }

    return(
        <Dialog open={props.dialog} maxWidth={"lg"} fullWidth={true} onClose={()=>{props.setDialog()}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">
                    Post Title
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    placeholder="Enter post title here..."
                    type="text"
                    fullWidth
                    value = {postTitle}
                    onChange = {e => setPostTitle(e.target.value)}
                    style={{marginBottom: 20}}
                    error={titleError.length === 0 ? false : true}
                    helperText={titleError}
                />
                <Typography variant="subtitle2">
                    Post Body
                </Typography>
                <TextField
                    margin="dense"
                    id="body"
                    placeholder="Enter post body here..."
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    value = {postBody}
                    onChange = {e => setPostBody(e.target.value)}
                    style={{marginBottom: 20}}
                    error={bodyError.length === 0 ? false : true}
                    helperText={bodyError}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={submitPost}>
                    Submit
                </Button>
            </DialogActions>
      </Dialog>
    )
}