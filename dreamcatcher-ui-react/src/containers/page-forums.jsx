import React, {Component, useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import PostsTable from '../components/posts-table';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PostDialog from '../components/post-dialog'
import {firebaseDateToJSDate} from "../misc/utilities"
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuthState, useAuthDispatch } from '../context/context';
import {firestore} from "../components/firebase"

const useStyles = makeStyles((theme) => ({
  small: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  subtitle: {
    color: grey[500],
    marginLeft: theme.spacing(1.5)
  },
  title: {
    marginLeft: theme.spacing(1.5)
  },
  forumCard: {
    margin: '20px', minHeight: '125px', display: "flex", flexDirection: "column", justifyContent: "center"
  },
  fab: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed"
  }
}));

function ForumsPage(props) {
    const classes = useStyles();

    const [forumNum, setForumNum] = useState(1);
    const [dialog, setDialog] = useState(false);
    // const [backgroundColor, setBackgroundColor] = useState(['green', 'white', 'white', 'white'])
    // const [textColor, setTextColor] = useState(['black', 'black', 'black', 'black'])
    const [backgroundColor1, setBackgroundColor1] = useState('#3f51b5')
    const [backgroundColor2, setBackgroundColor2] = useState('white')
    const [backgroundColor3, setBackgroundColor3] = useState('white')
    const [backgroundColor4, setBackgroundColor4] = useState('white')

    const [textColor1, setTextColor1] = useState('white')
    const [textColor2, setTextColor2] = useState('black')
    const [textColor3, setTextColor3] = useState('black')
    const [textColor4, setTextColor4] = useState('black')

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('')

    const categories = ["Interview Experiences", "Offer Discussion", "Technical Questions", "General Discussion"]

    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();

    useEffect(() => {
      (async function() {
        
        setIsLoading(true);

        const forumsReference = firestore.collection('forums').orderBy("date", "desc").where("category", "==", categories[forumNum-1]);
        // const forumsReference = firestore.collection('forums').where("category", "==", categories[forumNum-1]);

        const data = await forumsReference.get();

        // if(data.empty) {
        //   alert("ERROR")
        //   return;
        // }
        
        let postsArr = []

        data.forEach(doc => {
          
          const dateObj = {_seconds: doc.data().date.seconds, _nanoseconds: doc.data().date.nanoseconds}
          const options = {year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit"}

          const datetime = firebaseDateToJSDate(dateObj, options)

          const date = datetime.substr(0, datetime.length - 10)
          const time = datetime.substr(datetime.length-8, datetime.length)

          postsArr.push({
            id: doc.id,
            title: doc.data().title,
            date: date,
            time: time,
            username: doc.data().username
          })

        })

        setPosts(postsArr)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: userDetails.token })
        }

        const response = await fetch('/auth/getUsername', requestOptions)
        const usernameObj = await response.json()
        
        setUsername(usernameObj.data.username)
        // console.log(username.data.username)

        setIsLoading(false)

      })();
    }, [forumNum])

    const showDialog = () => {
      setDialog(dialog => !dialog)
    }

    const handleCardClick = (id) => {

      switch(id) {
        case 1: {
          console.log("here1")
          setBackgroundColor1('#3f51b5')
          setTextColor1('white')
          
          setBackgroundColor2('white')
          setTextColor2('black')
          setBackgroundColor3('white')
          setTextColor3('black')
          setBackgroundColor4('white')
          setTextColor4('black')

          break
        }
        case 2: {
          console.log("here2")
          setBackgroundColor2('#3f51b5')
          setTextColor2('white')

          setBackgroundColor1('white')
          setTextColor1('black')
          setBackgroundColor3('white')
          setTextColor3('black')
          setBackgroundColor4('white')
          setTextColor4('black')

          break
        }
        case 3: {
          console.log("here3")
          setBackgroundColor3('#3f51b5')
          setTextColor3('white')

          setBackgroundColor1('white')
          setTextColor1('black')
          setBackgroundColor2('white')
          setTextColor2('black')
          setBackgroundColor4('white')
          setTextColor4('black')

          break
        }
        case 4: {
          console.log("here4")
          setBackgroundColor4('#3f51b5')
          setTextColor4('white')

          setBackgroundColor1('white')
          setTextColor1('black')
          setBackgroundColor2('white')
          setTextColor2('black')
          setBackgroundColor3('white')
          setTextColor3('black')

          break
        }
      }

      setForumNum(id)
    }

    const addPost = (post) => {
      setPosts([{
        id: post.id,
        title: post.title,
        date: post.date,
        time: post.time,
        username: post.username
      }, ...posts])
    }

    if(isLoading) {
      return (
        <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="10vw" />
        </div>
      );
    }
    else {
      return (
        <div className="body-content forums">
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={showDialog}>
            <AddIcon />
          </Fab>
          
          <Grid container align="center">
            <Grid item xs={3}>
              <Card  className={classes.forumCard} style={{backgroundColor: backgroundColor1, color: textColor1}} onClick={()=>handleCardClick(1)} >
                <CardContent>
                  <Typography variant="h4">
                    Interview Experiences
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.forumCard} style={{backgroundColor: backgroundColor2, color: textColor2}} onClick={()=>handleCardClick(2)}>
                <CardContent>
                  <Typography variant="h4">
                    Offer<br/>Discussion
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.forumCard} style={{backgroundColor: backgroundColor3, color: textColor3}} onClick={()=>handleCardClick(3)}>
                <CardContent>
                  <Typography variant="h4">
                    Technical<br/>Questions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.forumCard} style={{backgroundColor: backgroundColor4, color: textColor4}} onClick={()=>handleCardClick(4)}>
                <CardContent>
                  <Typography variant="h4">
                    General<br/>Discussion
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
            {
              dialog ? <PostDialog dialog={dialog} setDialog={showDialog} forumNum={forumNum} addPost={addPost}/> : null
            } 
            </Grid>
            <Grid item xs={12} style={{ marginLeft: '20px', marginRight: '20px'}}>
              <PostsTable forumNum={forumNum} posts={posts} username={username}/>
            </Grid>
          </Grid>
        </div>
      )
    }
}

export default withRouter(ForumsPage);