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

// const posts1 = [
//     {
//       title: 'Google Software Engineer 2020',
//       date: '18 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Microsoft Software Engineer 2020',
//       date: '19 December, 2020',
//       time: '12:00pm',
//       userName: 'burhan'
//     },
//     {
//       title: 'Amazon SDE New Grad Experience',
//       date: '20 December, 2020',
//       time: '12:00pm',
//       userName: 'anand'
//     },
//     {
//       title: 'Netflix Senior SDE',
//       date: '21 December, 2020',
//       time: '12:00pm',
//       userName: 'lorem'
//     },
//     {
//       title: 'Apple SDE Interview',
//       date: '22 December, 2020',
//       time: '12:00pm',
//       userName: 'ipsum'
//     }
//   ]
  
//   const posts2 = [
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '17 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity titles',
//       date: '17 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '17 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     }
//   ]
  
//   const posts3 = [
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '16 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity titles',
//       date: '16 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '16 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     }
//   ]
  
//   const posts4 = [
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '15 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity titles',
//       date: '15 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     },
//     {
//       title: 'Really Really long and clickbaity title',
//       date: '15 December, 2020',
//       time: '12:00pm',
//       userName: 'yukulkar'
//     }
//   ]

function PostsTable(props) {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([])

    let categories = ["Interview Experiences", "Offer Discussion", "Technical Questions", "General Discussion"]

    // switch(props.forumNum) {
    //     case 1: posts = posts1;
    //             break;
    //     case 2: posts = posts2;
    //             break;
    //     case 3: posts = posts3;
    //             break;
    //     case 4: posts = posts4;
    //             break;
    // }

    useEffect(() => {
      (async function() {
        
        setIsLoading(true);

        const forumsReference = firestore.collection('forums').where("category", "==", categories[props.forumNum-1]);

        // console.log(props.forumNum)
        // console.log(categories[props.forumNum-1])

        const data = await forumsReference.get();

        if(data.empty) {
          alert("ERROR")
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
        // setIsLoading(isLoading => !isLoading)

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
                          <TableCell onClick={()=>props.history.push(`/post/${post.id}`)}>
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