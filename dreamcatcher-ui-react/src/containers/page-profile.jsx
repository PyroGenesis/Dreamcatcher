import React, { Component, useEffect } from 'react'
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
import MenuItem from '@material-ui/core/MenuItem';
import { Container, IconButton, ThemeProvider } from '@material-ui/core';
import { Add, AccessAlarm, ThreeDRotation, Edit, Delete } from '@material-ui/icons';
import { DatePicker } from "@material-ui/pickers";
import moment from 'moment';

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
      this.isUsername = true;
      this.accessInfo = username;
      // })
    } else {
      const userDetails = /*useAuthState();*/ this.context;
      this.isUsername = false;
      this.accessInfo = userDetails.token;
    }

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

function ExperienceEdit({ data, open/*, closeFn, modifyFn */ }) {
  // const [open, setOpen] = React.useState(ed);
  if (data == null) {
    data = {
      company: '',
      position: '',
      type: '',
      start: new Date(),
      end: new Date(),
      location: '',
      description: ''
    }
  } else {
    data = { ...data };
  }

  const handleClose = () => {
    // closeFn();
  };

  const handleSave = () => {
    // modifyFn(data);
    // handleClose();
  }

  const textFieldChanged = (e) => {
    // data[e.target.id] = e.target.value;
  }

  const jobTypes = ['Full time', 'Part time', 'Contract'];

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="experience-edit-dialog">
        <DialogTitle id="experience-edit-dialog">Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the details of your professional experience
          </DialogContentText>
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField autoFocus required margin="dense" id="company" label="Company" type="text"
                defaultValue={data.company} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="position" label="Position" type="text"
                defaultValue={data.position} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="type" label="Type" select
                defaultValue={data.type} onChange={textFieldChanged} fullWidth >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required margin="dense" id="start" label="Start Date" disableFuture format="MMM DD, yyyy"
                defaultValue={data.start} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required margin="dense" id="end" label="End Date" disablePast format="MMM DD, yyyy"
                defaultValue={data.end} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="location" label="Location" type="text"
                defaultValue={data.location} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="description" label="Description" type="text" multiline
                defaultValue={data.description} onChange={textFieldChanged} fullWidth />
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

function EducationEdit({ data, open, closeFn, modifyFn, saveFn }) {
  // const [open, setOpen] = React.useState(ed);
  // const [data, changeData] = React.useState({
  //   university: inputData ? inputData.university : '',
  //   degree: inputData ? inputData.degree : '',
  //   major: inputData ? inputData.major : '',
  //   startYear: inputData ? inputData.startYear : '',
  //   endYear: inputData ? inputData.endYear : ''
  // });

  // console.log('input', inputData?true:false, inputData);

  // useEffect(() => {
  //   inputData
  // })

  // if (data == null) {
  //   data = {
  //     university: '',
  //     degree: '',
  //     major: '',
  //     startYear: '',
  //     endYear: ''
  //   }
  // } else {
  //   data = { ...data };
  // }

  const handleClose = () => {
    closeFn();
    // console.log(data);
    // setOpen(false);
  };

  const handleSave = () => {
    saveFn(data);
    handleClose();
  }

  const textFieldChanged = (e) => {
    if (data == null) {
      data = {
        university: '',
        degree: '',
        major: '',
        startYear: null,
        endYear: null
      };
    }
    data[e.target.id] = e.target.value;
    // changeData({
    //   ...data,
    //   [e.target.id]: e.target.value
    // });
  }

  // const argTest = (...args) => { console.log('args',args) };

  const dateFieldChanged = (id) => (date) => {
    if (data == null) {
      data = {
        university: '',
        degree: '',
        major: '',
        startYear: null,
        endYear: null
      };
    }
    modifyFn({
      ...data,
      [id]: date.year()
    })
    // data[id] = date.year();
    // changeData({
    //   ...data,
    //   [id]: date.year()
    // });
  };

  console.log(data);

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
                defaultValue={data ? data.university : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="degree" label="Program" type="text"
                defaultValue={data ? data.degree : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required margin="dense" id="major" label="Major" type="text"
                defaultValue={data ? data.major : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required margin="dense" id="startYear" label="Start Year" views={["year"]} disableFuture
                value={data && data.startYear ? moment([data.startYear]) : null} onChange={dateFieldChanged('startYear')} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required margin="dense" id="endYear" label="End Year" views={["year"]}
                value={data && data.endYear ? moment([data.endYear]) : null} onChange={dateFieldChanged('endYear')} fullWidth />
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
    setEdEditData(ed);
    setEdSelected(edIdx);
    console.log('from parent',edEditData,ed);
    toggleEdEdit(true);
    // console.log(edSelected);
  }
  const closeEdEdit = () => {
    setEdEditData(null);
    toggleEdEdit(false);
    // console.log(edSelected);
  }
  const modifyEd = (newData) => {
    setEdEditData({ ...edEditData, ...newData });
  }
  const saveEd = (newData) => {
    // console.log(newData);
    // return;
    let edCopy = education.slice();
    if (edSelected === -1) {
      edCopy.push(newData);
    } else {
      edCopy[edSelected] = newData;
    }
    edCopy.sort((a, b) => b.startYear - a.startYear);
    console.log(edCopy, edSelected);

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
    });
  }
  const deleteEd = (edIdx) => {
    // deletes and copies
    let edCopy = education.slice();
    edCopy.splice(edIdx, 1);

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
    });
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
          saveFn={(newData) => { saveEd(newData) }}
        />

        <ExperienceEdit open={false}
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
                    <IconButton aria-label="edit" edge="end" style={{ alignSelf: 'start' }} onClick={() => { showEdit(ed, edIdx) }}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" edge="end" style={{ alignSelf: 'start' }} onClick={() => { deleteEd(edIdx) }}>
                      <Delete />
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