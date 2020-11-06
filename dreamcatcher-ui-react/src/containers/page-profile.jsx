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
import { Container, ThemeProvider } from '@material-ui/core';

import { BurhanGlobalTheme } from "../styles/themes";
import { grey } from '@material-ui/core/colors';

import profilePic from '../assets/mock-profile/profile-icon.jpg'
import company1Pic from '../assets/mock-profile/company1.png'
import company2Pic from '../assets/mock-profile/company2.png'
import uniPic from '../assets/mock-profile/university1.png'

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
  lightGreyText: {
    ...theme.typography.subtitle2,
    fontSize: '0.75rem',
    lineHeight: 1.1,
    color: grey[500],
  },

  detailBox: {
    width: '100%',
    paddingBottom: 15
  },
  experienceCompany: {
    ...theme.typography.body2,
    paddingBottom: 3,
    fontWeight: 600,
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();

  return (
    // <div className="body-content profile">
    //   <h1>Profile!</h1>
    // </div>
    <div className="body-content">
      <ThemeProvider theme={BurhanGlobalTheme}>
        <Grid container spacing={1} style={{ height: '100%', width: '100%', padding: 8 }}>
          <Grid item xs={12} sm={4}>
            <Card elevation={3}>
              <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className={classes.centerContainer}>
                  <Avatar alt="B" className={classes.largeAvatar} src={profilePic} />
                </div>
                <Typography align="center" variant="h4" style={{ paddingTop: 20 }}>
                  Burhanuddin Lakdawala
              </Typography>
                <Typography variant="h6" style={{ paddingTop: 20 }}>
                  Software Engineer at Personable Inc. | Grad student in CS @ UCI
              </Typography>
                <Typography align="right" variant="subtitle2" className={classes.lightGreyText}>
                  Irvine, California, United States
              </Typography>

                <Divider />
                <Typography variant="overline">
                  About
              </Typography>
                <Typography style={{ flexGrow: 1, overflowY: 'auto' }}>
                Software Engineer Intern undertaking .NET application development at Personable Inc. Graduate Student in Computer Science at UCI and previously employed as a Software Engineer in Mastek's Innovation Team. Won 1st place in Mastek's prestigious Project Deep Blue. Enthusiastic about learning and working with new technologies as well as applying them to provide solutions for business problems.

              </Typography>

              </CardContent>
              {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card elevation={3}>
              <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <Typography variant="overline">
                  Experience
                </Typography>
                <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                  <Grid item style={{ width: 75 }}>
                    <Avatar variant="square" alt="P" src={company1Pic} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Software Engineer Intern</Typography>
                    <Typography variant="body2">Personable Inc. - Fulltime</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>Jun 2020 - Dec 2020</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>Irvine, California, United States</Typography>
                    <Typography>Designed and developed 30-40% of all enhancements and improvements for Personable’s prime product, ScanWriter, which significantly improved user experience and expanded core functionality.<br />Also played an important role in transitioning the dev environment to a version-controlled CI / CD environment, which reduced merge errors by up to 50%</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                  <Grid item style={{ width: 75 }}>
                    <Avatar variant="square" alt="M" src={company2Pic} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Software Engineer</Typography>
                    <Typography variant="body2">Mastek Ltd. - Fulltime</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>Jun 2018 - Aug 2019</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>Mumbai, Maharashtra, India</Typography>
                    <Typography>Developed an NLP solution consisting of Text Summarization, Sentiment Analysis, and Document Clustering.
Adapted the solution into a Review Analytics platform for Mastek’s customers, using Angular as the front-end, Python Flask as the back-end and hosted on Azure Cloud.
Designed the Angular UI for a document profiler application, chatbot application, and a machine-learning project.</Typography>
                  </Grid>
                </Grid>

                <Typography variant="overline">
                  Education
                </Typography>
                <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                  <Grid item style={{ width: 75 }}>
                    <Avatar variant="square" alt="I" src={uniPic} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">University of California, Irvine</Typography>
                    <Typography variant="body2">Masters - Computer Science</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>2019 - 2020</Typography>
                  </Grid>
                </Grid>
                
                <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                  <Grid item style={{ width: 75 }}>
                    <Avatar variant="square">
                      M
                  </Avatar>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">University of Mumbai</Typography>
                    <Typography variant="body2">Bachelors of Engineering - Information Technology</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>2014 - 2018</Typography>
                  </Grid>
                </Grid>


              </CardContent>
              {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}