import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '../components/table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Calendar from '../components/calendar'
import 'react-calendar-heatmap/dist/styles.css';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  paper:{
    padding:10, display: 'flex',
    alignContent: 'space-between',
    alignItems: 'center',
    width:'80%'
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}
      justify="center">
        <Grid item xs={4}> 
          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2"  href="past-applications" style={{ flex: 1 }}>
                  Total Applications: 10        
              </Typography>
              <Button href ="past-applications">View</Button>
          </Paper>
          
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Coding Tests Received: 2/10
              </Typography>
              <Button>View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Interview Scheduled: 2/10
              </Typography>
              <Button>View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Software Development Engineer: 4
              </Typography>
              <Button>View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Full Stack Developer: 4
              </Typography>
              <Button>View</Button>
          </Paper>

          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Web Developer: 4
              </Typography>
              <Button>View</Button>
          </Paper>

        </Grid>
        <Grid item xs={6} justify= "center" alignContent = "center"> 
          <h1 style={{fontFamily: "Roboto"}}> 20 applications in the past 4 months</h1>
          <Paper >
            <Calendar/> 
          </Paper>
          <br></br>
          <br></br>
          <br></br>
          <Table numRows = "5"/> 
        </Grid>
      </Grid> 
    </div>
  );
}