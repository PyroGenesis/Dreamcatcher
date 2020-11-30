import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '../components/table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Calendar from '../components/calendar'
import 'react-calendar-heatmap/dist/styles.css';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { firebaseDateToJSDate } from "../misc/utilities";


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


function getCounts(data){
  var countS = 0, countF = 0, countW = 0, countI = 0, countC = 0,  countML = 0, count120 = 0;
  var dailyCounts = new Array(120);
  dailyCounts.fill(0);
  const today = new Date();
  if(data==null)
    return [countS, countF, countW, countI, countC, count120, dailyCounts, countML];
  for(var i = 0; i<data.applications.length;i++){
    const dateObj = {_seconds: data.applications[i].date._seconds, _nanoseconds:data.applications[i].date._nanoseconds};
    const options = {year: "numeric", month: "numeric", day: "2-digit"};
    const datetime = firebaseDateToJSDate(dateObj, options);
    console.log(datetime);
    var day = datetime.substring(3,5);
    var month = datetime.substring(0,2)-1;
    var year = datetime.substring(6);
    var date = new Date(year,month,day);
    var res = Math.abs(today - date) / 1000;
    var days = Math.floor(res / 86400);
    if(days<=120){
      count120++;
      dailyCounts[days]+=1;
    }
    if(data.applications[i].status == "Interview")
      countI++;
    else if(data.applications[i].status == "Coding Test")
      countC++;
    if(data.applications[i].position.position_name == "Software Development Engineer")
      countS++;
    else if(data.applications[i].position.position_name == "Full Stack Developer")
    countF++;
    else if(data.applications[i].position.position_name == "Web Developer")
    countW++;
    else if(data.applications[i].position.position_name == "Machine Learning Engineer")
    countML++;
  }
  return [countS, countF, countW, countI, countC, count120, dailyCounts, countML];
}
export default function CenteredGrid(tableData) {
  const classes = useStyles();
  const data = tableData.tableData.data;
  const count = data == null?0:data.applications.length;
  const counts = getCounts(data);
  return (
    <div className={classes.root}>
      <Grid container spacing={5}
      justify="center">
        <Grid item xs={4}> 
          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2"  href="past-applications" style={{ flex: 1 }}>
                  Total Applications: {count}        
              </Typography>
              <Button href ="past-applications">View</Button>
          </Paper>
          
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Coding Tests Received: {counts[4]}/{count} 
              </Typography>
              <Button href="coding-tests">View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Interview Scheduled: {counts[3]}/{count}
              </Typography>
              <Button href="interviews" >View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Software Development Engineer: {counts[0]}
              </Typography>
              <Button href="software-applications">View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Full Stack Developer: {counts[1]}
              </Typography>
              <Button href="full-stack-applications">View</Button>
          </Paper>

          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Web Developer: {counts[2]}
              </Typography>
              <Button  href="web-applications" >View</Button>
          </Paper>

          <br></br><br></br>
          
          <Paper className = {classes.paper}>
            <Typography variant="h5" component="h2" style={{ flex: 1 }}>
                  Machine Learning Engineer: {counts[7]}
              </Typography>
              <Button  href="ml-applications" >View</Button>
          </Paper>

        </Grid>
        <Grid item xs={6} justify= "center" alignContent = "center"> 
          <h1 style={{fontFamily: "Roboto"}}> {counts[5]} applications in the past 4 months</h1>
          <Paper >
            <br></br>
            <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#eeeeee', marginLeft: 5}}></Paper>
            <span>  0 applications</span>
            <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#d6e685', marginLeft: 5}}></Paper>
            <span>  1-3 applications</span>
            <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#8cc665', marginLeft: 5}}></Paper>
            <span>  4-7 applications</span>
            <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#44a340', marginLeft: 5}}></Paper>
            <span>  7-10 applications</span>
            <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#1e6823', marginLeft: 5}}></Paper>
            <span>  {">"} 10 applications</span>
            <Calendar countArray = {counts[6]}/> 
          </Paper>
          <br></br>
          <br></br>
          <br></br>
          <Table numRows = "5" title = "Past Applications" data = {data}/> 
        </Grid>
      </Grid> 
    </div>
  );
}