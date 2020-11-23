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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, IconButton, ThemeProvider } from '@material-ui/core';
import { Add, AccessAlarm, ThreeDRotation, Edit } from '@material-ui/icons';

import { BurhanGlobalTheme } from "../styles/themes";
import { firebaseDateToJSDate } from "../misc/utilities";
import { grey } from '@material-ui/core/colors';

import profilePic from '../assets/mock-profile/profile-icon.jpg'
import company1Pic from '../assets/mock-profile/company1.png'
import company2Pic from '../assets/mock-profile/company2.png'
import uniPic from '../assets/mock-profile/university1.png'

const PROFILE_DATE_OPTIONS = {
  month: 'short',
  year: 'numeric'
}

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

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: true,
      data: null
    }
  }

  componentDidMount() {
    fetch('/profiles/burhan').then((res) => {
      return res.json();
    }).then((profileData) => {
      if (profileData.status === 200) {
        this.setState({
          isLoaded: true,
          isError: false,
          data: profileData.data.profile
        });
      } else {
        this.setState({
          isLoaded: true,
          data: `Error in retrieval, status: ${profileData.status}, message: ${profileData.message}`
        })
      }
      // console.log(profileData.data.profile);
    }, (err) => {
      this.setState({
        isLoaded: true,
        data: `Unknown error: ${err}`
      })
      console.log(err);
    })
  }


  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="20vw" />
        </div>
      )
    } else if (this.state.isError) {
      return <div className="body-content"><Typography variant="h1">{this.state.data}</Typography></div>
    } else {
      return <ProfilePageUI profileData={this.state.data} />
      // return null
    }
  }
}

function ProfilePageUI({ profileData }) {
  const classes = useStyles();
  const { about, education, experience, fullname, headline, location } = profileData
  // console.log(about, education, experience, fullname, headline, location);
  // console.log(profileData)

  // return <div></div>

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
                  {fullname}
                </Typography>
                <Typography variant="h6" style={{ paddingTop: 20 }}>
                  {headline}
                </Typography>
                <Typography align="right" variant="subtitle2" className={classes.lightGreyText}>
                  {location}
                </Typography>

                <Divider />
                <Typography variant="overline">
                  About
                </Typography>
                <Typography style={{ flexGrow: 1, overflowY: 'auto' }}>
                  {about}
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

                {experience.map(ex => (
                  <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                    <Grid item style={{ width: 75 }}>
                      <Avatar variant="square" /*src={company1Pic}*/ >{ex.company.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">{ex.position}</Typography>
                      <Typography variant="body2">{ex.company} - {ex.type}</Typography>
                      <Typography variant="subtitle2" className={classes.lightGreyText}>
                        {firebaseDateToJSDate(ex.start, PROFILE_DATE_OPTIONS)} - {firebaseDateToJSDate(ex.end, PROFILE_DATE_OPTIONS)}
                      </Typography>
                      <Typography variant="subtitle2" className={classes.lightGreyText}>{ex.location}</Typography>
                      <Typography>{ex.description}</Typography>
                    </Grid>
                  </Grid>
                ))}


                {/* <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
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
                </Grid> */}

                <div style={{ display: 'flex' }}>
                  <Typography variant="overline" style={{ flexGrow: 1 }}>
                    Education
                  </Typography>
                  <IconButton aria-label="add" style={{alignSelf: 'start'}}>
                    <Add />
                  </IconButton>
                </div>
                {/* <Grid container spacing={0} wrap="nowrap" className={classes.detailBox}>
                  <Grid item style={{ width: 75 }}>
                    <Avatar variant="square" alt="I" src={uniPic} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">University of California, Irvine</Typography>
                    <Typography variant="body2">Masters - Computer Science</Typography>
                    <Typography variant="subtitle2" className={classes.lightGreyText}>2019 - 2020</Typography>
                  </Grid>
                </Grid> */}

                {education.map(ed => (
                  <div style={{ display: 'flex' }}>
                    <Grid container spacing={0} wrap="nowrap" className={classes.detailBox} style={{ flexGrow: 1 }}>
                      <Grid item style={{ width: 75 }}>
                        <Avatar variant="square">
                          {ed.university.charAt(0)}
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">{ed.university}</Typography>
                        <Typography variant="body2">{ed.degree} - {ed.major}</Typography>
                        <Typography variant="subtitle2" className={classes.lightGreyText}>{ed.startYear} - {ed.endYear}</Typography>
                      </Grid>
                    </Grid>
                    <IconButton aria-label="edit" style={{alignSelf: 'start'}}>
                      <Edit />
                    </IconButton>
                  </div>
                ))}



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