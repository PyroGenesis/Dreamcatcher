import React, {Component} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import { Card, CardContent, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

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

const posts1 = [
    {
      title: 'Google Software Engineer 2020',
      date: '18 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Microsoft Software Engineer 2020',
      date: '19 December, 2020',
      time: '12:00pm',
      userName: 'burhan'
    },
    {
      title: 'Amazon SDE New Grad Experience',
      date: '20 December, 2020',
      time: '12:00pm',
      userName: 'anand'
    },
    {
      title: 'Netflix Senior SDE',
      date: '21 December, 2020',
      time: '12:00pm',
      userName: 'lorem'
    },
    {
      title: 'Apple SDE Interview',
      date: '22 December, 2020',
      time: '12:00pm',
      userName: 'ipsum'
    }
  ]
  
  const posts2 = [
    {
      title: 'Really Really long and clickbaity title',
      date: '17 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity titles',
      date: '17 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity title',
      date: '17 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    }
  ]
  
  const posts3 = [
    {
      title: 'Really Really long and clickbaity title',
      date: '16 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity titles',
      date: '16 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity title',
      date: '16 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    }
  ]
  
  const posts4 = [
    {
      title: 'Really Really long and clickbaity title',
      date: '15 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity titles',
      date: '15 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    },
    {
      title: 'Really Really long and clickbaity title',
      date: '15 December, 2020',
      time: '12:00pm',
      userName: 'yukulkar'
    }
  ]

export default function PostsTable(props) {
    const classes = useStyles();

    let posts;

    switch(props.forumNum) {
        case 1: posts = posts1;
                break;
        case 2: posts = posts2;
                break;
        case 3: posts = posts3;
                break;
        case 4: posts = posts4;
                break;
    }

    return (
        <TableContainer component={Card}>
            <Table>
                <TableBody>
                    {posts.map((post) => (        
                    <TableRow>
                        <TableCell /*onClick={()=>props.history.push('/positions')}*/>
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