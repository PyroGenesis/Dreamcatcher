import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.typography.fontSize * 3,
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
        <Grid item xs={12} sm={4} height="100%">
          <Card height={1}>
            <CardContent style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
              <div className={classes.centerContainer}>
                <Avatar className={classes.largeAvatar}>B</Avatar>
              </div>
              <Typography align="center" variant="h4" style={{ paddingTop: 20 }}>
                Firstname Lastname
              </Typography>
              <Typography variant="h6" style={{ paddingTop: 20 }}>
                Position at Company | Grad student in Subject @ University
              </Typography>
              <Typography align="right" variant="subtitle2">
                Irvine, California, United States
              </Typography>

              <Divider />
              <Typography variant="h4">
                About
              </Typography>
              <Typography style={{flexGrow: 1, overflowY: 'auto'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. A pellentesque sit amet porttitor. Ut morbi tincidunt augue interdum velit. Amet cursus sit amet dictum sit. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Pharetra convallis posuere morbi leo urna. Consequat semper viverra nam libero justo laoreet sit amet cursus. Tellus at urna condimentum mattis pellentesque id. Cursus eget nunc scelerisque viverra mauris. Bibendum at varius vel pharetra vel turpis nunc eget. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Pulvinar neque laoreet suspendisse interdum consectetur libero. Lorem sed risus ultricies tristique nulla. Ornare quam viverra orci sagittis.

              </Typography>

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