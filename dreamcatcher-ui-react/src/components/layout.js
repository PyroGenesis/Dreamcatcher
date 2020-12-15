import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '../components/table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Calendar from '../components/calendar'
import 'react-calendar-heatmap/dist/styles.css';
import Paper from '@material-ui/core/Paper';
import { useAuthState } from '../context/context';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashBoardTable from '../components/dashboardTable';


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
  const userDetails = useAuthState();
  const [count,setCount] = React.useState(0);
  const [refresh,setRefresh] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data,setData] = React.useState(null);
  const [countI, setCountI] = React.useState(0);
  const [countC, setCountC] = React.useState(0);
  const [countS,setCountS] = React.useState(0);
  const [countW, setCountW] = React.useState(0);
  const [countML, setCountML] = React.useState(0);
  const [countF,setCountF] = React.useState(0);
  const [count120, setCount120] = React.useState(0);
  const [dailyCounts,setDailyCounts] = React.useState(new Array(120).fill(0));


  React.useEffect(() => {
    (async function() {
      var response =  await fetch('/applications/data?token='+userDetails.token);
      const body = await response.json();
      console.log(body);
      setData(body.data);
      setCount(body.data == null?0:body.data.applications.length);
      setCountS(body.data == null?0:body.data.countS);
      setCountC(body.data == null?0:body.data.countC);
      setCountW(body.data == null?0:body.data.countW);
      setCountF(body.data == null?0:body.data.countF);
      setCountI(body.data == null?0:body.data.countI);
      setCount120(body.data == null?0:body.data.count120);
      setCountML(body.data == null?0:body.data.countML);
      setDailyCounts(body.data == null?new Array(120).fill(0):body.data.dailyCounts);
      setIsLoading(false);
    })();
  },[refresh])

  const handleChangeStatus = () => {
    setRefresh(refresh==true?false:true);
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
    <div className={classes.root}>
      <Grid container spacing={0}
      justify="center">
        <Grid item xs={4}> 
          <Paper className = {classes.paper}>
            <Typography  component="p"  href="past-applications" style={{ flex: 1, fontSize:20 }}>
                  Total Applications: {count}        
              </Typography>
              <Button href ="past-applications">View</Button>
          </Paper>
          
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography component="p" style={{ flex: 1, fontSize:20}}>
                  Coding Tests Received: {countC}/{count} 
              </Typography>
              <Button href="coding-tests">View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography component="p"style={{ flex: 1, fontSize:20 }}>
                  Interview Scheduled: {countI}/{count}
              </Typography>
              <Button href="interviews" >View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography component="p" style={{ flex: 1, fontSize:20 }}>
                  Software Development Engineer: {countS}
              </Typography>
              <Button href="software-applications">View</Button>
          </Paper>
          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography component="p" style={{ flex: 1, fontSize:20 }}>
                  Full Stack Developer: {countF}
              </Typography>
              <Button href="full-stack-applications">View</Button>
          </Paper>

          <br></br><br></br>

          <Paper className = {classes.paper}>
            <Typography component="p" style={{ flex: 1, fontSize:20 }}>
                  Web Developer: {countW}
              </Typography>
              <Button  href="web-applications" >View</Button>
          </Paper>

          <br></br><br></br>
          
          <Paper className = {classes.paper}>
            <Typography component="p" style={{ flex: 1, fontSize:20 }}>
                  Machine Learning Engineer: {countML}
              </Typography>
              <Button  href="ml-applications" >View</Button>
          </Paper>

        </Grid>
        <Grid item xs={6} justify= "center" alignContent = "center"> 
          <h3 style={{fontFamily: "Roboto"}}> {count120} applications in the past 4 months</h3>
          <Paper >
            <br></br>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
              <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#eeeeee', marginLeft: 5, marginRight: 5}}></Paper>
            <span>  0 applications</span>
              <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#d6e685', marginLeft: 5, marginRight: 5}}></Paper>
            <span>  1-3 applications</span>
              <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#8cc665', marginLeft: 5, marginRight: 5}}></Paper>
            <span>  4-7 applications</span>
              <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#44a340', marginLeft: 5, marginRight: 5}}></Paper>
            <span>  7-10 applications</span>
              <Paper square style ={{display: 'inline-block', width: 20, height: 20,background: '#1e6823', marginLeft: 5, marginRight: 5}}></Paper>
            <span>  {">"} 10 applications</span>
            </div>
            <Calendar countArray = {dailyCounts}/> 
          </Paper>
          <br></br>
          <br></br>
          <br></br>
          <DashBoardTable numRows = "5" title = "Recent Applications" data = {data} onChangeStatus ={handleChangeStatus}/> 
        </Grid>
      </Grid> 
    </div>
  );
  }
}