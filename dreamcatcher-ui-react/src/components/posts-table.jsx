import React, {Component, useEffect, useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import { Card, CardContent, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firestore} from "../components/firebase"
import {firebaseDateToJSDate} from "../misc/utilities"
import { withRouter } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../context/context';

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
    }
}));

function PostsTable(props) {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('')

    let categories = ["Interview Experiences", "Offer Discussion", "Technical Questions", "General Discussion"]

    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();

    useEffect(() => {
      (async function() {
        
        setIsLoading(true);

        const forumsReference = firestore.collection('forums').where("category", "==", categories[props.forumNum-1]);

        // console.log(props.forumNum)
        // console.log(categories[props.forumNum-1])

        const data = await forumsReference.get();

        if(data.empty) {
          alert("ERROR")
          return;
        }
        
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
            userName: doc.data().username
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
    }, [props.forumNum])

    if(isLoading) {
      return (
        <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="10vw" />
        </div>
      );
    }
    else {
      return (
          <TableContainer component={Card}>
              <Table>
                  <TableBody>
                      {posts.map((post) => (        
                        <TableRow key={post.id}>
                            <TableCell onClick={()=>props.history.push({pathname: `/post/${post.id}`, state: {username: username}})}>
                            <Grid container>
                              <Grid item>
                                <Avatar className={classes.small}>{post.userName[0]}</Avatar> 
                              </Grid>
                              <Grid item xs={12} sm container>
                                <Grid item xs container direction="column">
                                  <Typography variant="h6" className={classes.title}>
                                    {post.title}
                                  </Typography>
                                  <Typography variant="subtitle2" className = {classes.subtitle}>
                                    Posted on {post.date} at {post.time}
                                  </Typography>
                                </Grid>    
                              </Grid>
                            </Grid>
                            </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      )
    }
}

export default withRouter(PostsTable)