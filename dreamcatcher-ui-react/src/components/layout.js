import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '../components/table';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {VictoryPie} from 'victory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: 300,
    height: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
            <Card className={classes.card}>
                <CardContent>  
                <Typography variant="h5" component="h2">
                Total Applications
                </Typography>
                <Typography variant="h1" component="h1">
                10
                </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card className={classes.card}>
                <CardContent>
                <Typography variant="h5" component="h2">
                Positions Applied
                </Typography>
                <VictoryPie
                    colorScale={["gold", "cyan", "navy" ]}
                    data={[
                        { x: "Full Stack", y: 55 },
                        { x: "SDE", y: 35 },
                        { x: "Web Dev", y: 40 }
                      ]}
                />
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card className={classes.card}>
                <CardContent>
                <Typography variant="h5" component="h2">
                Status
                </Typography>
                <Typography variant ="body">
                <VictoryPie
                    colorScale={["gold", "cyan", "navy" ]}
                    data={[
                        { x: "Reject", y: 55 },
                        { x: "Applied", y: 35 },
                        { x: "Interview", y: 40 }
                      ]}
                />
                </Typography>
                
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={12}>
         <Table numRows = "5"/> 
         <Button variant="contained" color="primary" href="past-applications">
            VIEW ALL
          </Button>
        </Grid>
        
        
      </Grid>
    </div>
  );
}