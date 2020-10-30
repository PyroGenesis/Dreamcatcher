import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.typography.fontSize*3,
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();

  return (
    // <div className="body-content profile">
    //   <h1>Profile!</h1>
    // </div>
    <div className="body-content">
      <Grid container spacing={1} style={{ height: '100%', width: '100%' }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <div className={classes.centerContainer}>
              <Avatar className={classes.largeAvatar}>B</Avatar>
              </div>
              
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>Detailed Info</Paper>
        </Grid>
      </Grid>
    </div>
  )
}