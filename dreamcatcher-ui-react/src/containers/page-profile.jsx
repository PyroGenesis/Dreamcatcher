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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container, IconButton, ThemeProvider } from '@material-ui/core';
import { Add, AccessAlarm, ThreeDRotation, Edit } from '@material-ui/icons';

import { BurhanGlobalTheme } from "../styles/themes";
import { firebaseDateToJSDate } from "../misc/utilities";
import { grey } from '@material-ui/core/colors';

import profilePic from '../assets/mock-profile/profile-icon.jpg'
import company1Pic from '../assets/mock-profile/company1.png'
import company2Pic from '../assets/mock-profile/company2.png'
import uniPic from '../assets/mock-profile/university1.png'
import { useParams, withRouter } from 'react-router-dom';
import { useAuthState, AuthStateContext } from '../context/context';

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

class ProfilePage extends Component {
  static contextType = AuthStateContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: true,
      data: null,

      isUsername: false,
      accessInfo: null
    }
    this.isUsername = false;
    this.accessInfo = null;
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    if (username != null) {
      // this.setState({
      this.isUsername = true;
      this.accessInfo = username;
      // })
    } else {
      const userDetails = /*useAuthState();*/ this.context;
      console.log('token in context', userDetails.token);
      // this.setState({
      this.isUsername = false;
      this.accessInfo = userDetails.token;
      // });
      console.log('state inside else:', this.state.accessInfo);
    }

    // console.log('state outside else', this.state);
    console.log('profile session', this.isUsername, this.accessInfo);
    const profilePromise = this.isUsername ?
      fetch(`/profiles/${this.accessInfo}`) :
      fetch('/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.accessInfo })
      });

    profilePromise.then((res) => {
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
      return <ProfilePageUI profileData={this.state.data} isUsername={this.isUsername} accessInfo={this.accessInfo} />
      // return null
    }
  }
}

function EducationEdit({ data, open, closeFn, modifyFn }) {
  // const [open, setOpen] = React.useState(ed);
  if (data == null) {
    data = {
      university: '',
      degree: '',
      major: '',
      startYear: '',
      endYear: ''
    }
  } else {
    data = { ...data };
  }
  // const {} = data;

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    closeFn();
    // console.log(data);
    // setOpen(false);
  };

  const handleSave = () => {
    modifyFn(data);
    handleClose();
  }

  const textFieldChanged = (e) => {
    data[e.target.id] = e.target.value;
    // console.log(data);
    // console.log(e.target.id);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="education-edit-dialog">
        <DialogTitle id="education-edit-dialog">Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the details of your education
          </DialogContentText>
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField autoFocus required margin="dense" id="university" label="University" type="text"
                defaultValue={data.university} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="degree" label="Program" type="text"
                defaultValue={data.degree} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="major" label="Major" type="text"
                defaultValue={data.major} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="startYear" label="Start Year" type="number"
                defaultValue={data.startYear} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="endYear" label="End Year" type="number"
                defaultValue={data.endYear} onChange={textFieldChanged} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ProfilePageUI({ profileData, isUsername, accessInfo }) {
  const classes = useStyles();
  // const { about, education, experience, fullname, headline, location } = profileData

  profileData.education.sort((a, b) => b.startYear - a.startYear);

  const [about, changeAbout] = React.useState(profileData.about);
  const [education, changeEducation] = React.useState(profileData.education);
  const [experience, changeExperience] = React.useState(profileData.experience);
  const [fullname, changeFullname] = React.useState(profileData.fullname);
  const [headline, changeHeadline] = React.useState(profileData.headline);
  const [location, changeLocation] = React.useState(profileData.location);
  // console.log(about, education, experience, fullname, headline, location);
  // console.log(profileData)

  // return <div></div>
  const [edEdit, toggleEdEdit] = React.useState(false);
  const [edEditData, setEdEditData] = React.useState(null);
  const [edSelected, setEdSelected] = React.useState(-1);
  const showEdit = (ed, edIdx) => {
    toggleEdEdit(true);
    setEdEditData(ed);
    setEdSelected(edIdx);
    // console.log(edSelected);
  }
  const closeEdEdit = () => {
    toggleEdEdit(false);
    setEdEditData(null);
    // console.log(edSelected);
  }
  const modifyEd = (newData) => {
    console.log(newData, edSelected);
    let edCopy = education.slice();
    if (edSelected === -1) {
      edCopy.push(newData);
    } else {
      edCopy[edSelected] = newData;
    }
    edCopy.sort((a, b) => b.startYear - a.startYear);

    fetch('/profiles/education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessInfo, education: edCopy })
    }).then((res) => {
      return res.json();
    }).then(success => {
      if (success.status == 200) {
        changeEducation(edCopy);
      } else {
        console.log('API error: ', success);
      }
    }, error => {
      console.log('Unknown error: ', error)
    })
  }

  return (
    // <div className="body-content profile">
    //   <h1>Profile!</h1>
    // </div>
    <div className="body-content">
      <ThemeProvider theme={BurhanGlobalTheme}>
        <EducationEdit
          open={edEdit}
          data={edEditData}
          closeFn={() => { closeEdEdit() }}
          modifyFn={(newData) => { modifyEd(newData) }}
        // edIdx={edSelected}
        />

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
                  <Grid container spacing={0} wrap="nowrap" key={ex.start._seconds} className={classes.detailBox}>
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
                  <IconButton aria-label="add" style={{ alignSelf: 'start' }} onClick={() => { showEdit(null, -1) }}>
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

                {education.map((ed, edIdx) => (
                  <div key={ed.startYear} style={{ display: 'flex' }}>
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
                    <IconButton aria-label="edit" style={{ alignSelf: 'start' }} onClick={() => { showEdit(ed, edIdx) }}>
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

export default withRouter(ProfilePage);