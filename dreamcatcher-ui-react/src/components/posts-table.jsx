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
    return (
        <TableContainer component={Card}>
            <Table>
                <TableBody>
                    {props.posts.map((post) => (        
                      <TableRow key={post.id}>
                          <TableCell onClick={()=>props.history.push({pathname: `/post/${post.id}`, state: {username: props.username}})}>
                          <Grid container>
                            <Grid item>
                              <Avatar className={classes.small}>{post.username[0]}</Avatar> 
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

export default withRouter(PostsTable)