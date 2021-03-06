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
import { Add, AccessAlarm, ThreeDRotation, Edit, Delete, PhotoCamera } from '@material-ui/icons';
import { DatePicker } from "@material-ui/pickers";
import moment from 'moment';

import defaultuser from '../assets/images/user.png';
import { BurhanGlobalTheme } from "../styles/themes";
import { firebaseDateToJSDate, firebaseDateToJSDateObj } from "../misc/utilities";
import { grey } from '@material-ui/core/colors';

import { useParams, withRouter } from 'react-router-dom';
import { useAuthState, AuthStateContext } from '../context/context';

import Compress from "compress.js";
import ConfirmDialog from '../components/confirm-dialog';

const PROFILE_DATE_OPTIONS = {
  month: 'short',
  year: 'numeric'
};
const MOMENT_DATE_OPTIONS = "MMM YYYY";

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

function validate(fields, ignore) {
  // let isError = false;

  if (!fields) {
    return false;
  }

  for (const key in fields) {
    // console.log(key, fields[key]);
    if (ignore.includes(key)) {
      continue;
    }
    if (fields[key] == null || fields[key] === '') {
      return false;
    }
  }
  return true;
}

function BioEdit({ data, open, closeFn, /*modifyFn,*/ saveFn }) {
  const [dummy, triggerReRender] = React.useState(0);

  const handleClose = () => {
    closeFn();
  };

  const handleSave = () => {
    if (!validate(data, [])) {
      triggerReRender(dummy + 1);
      return;
    }
    saveFn(data);
    handleClose();
  }

  const textFieldChanged = (e) => {
    data[e.target.id] = e.target.value;
    // modifyFn(e.target.id, e.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="bio-edit-dialog">
        <DialogTitle id="bio-edit-dialog">Bio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit biographical data
          </DialogContentText>
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField autoFocus required
                error={data && data.headline.length === 0} helperText={data && data.headline.length === 0 ? "This field is required" : ''}
                margin="dense" id="headline" label="Headline" type="text"
                defaultValue={data ? data.headline : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={data && data.location.length === 0} helperText={data && data.location.length === 0 ? "This field is required" : ''}
                margin="dense" id="location" label="Location" type="text"
                defaultValue={data ? data.location : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={data && data.about.length === 0} helperText={data && data.about.length === 0 ? "This field is required" : ''}
                margin="dense" id="about" label="About" type="text" multiline
                defaultValue={data ? data.about : ''} onChange={textFieldChanged} fullWidth />
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

function ExperienceEdit({ data, open, closeFn, modifyFn, saveFn }) {
  const [dummy, triggerReRender] = React.useState(0);

  const handleClose = () => {
    closeFn();
  };

  const handleSave = () => {
    if (!validate(data, ['image'])) {
      triggerReRender(dummy + 1);
      return;
    }
    saveFn(data);
    handleClose();
  }

  const basicCheck = () => {
    if (data == null) {
      data = {
        company: '',
        position: '',
        type: '',
        start: null,
        end: null,
        location: '',
        description: ''
      };
    }
  }

  const textFieldChanged = (e) => {
    basicCheck();
    modifyFn({
      ...data,
      [e.target.id]: e.target.value
    })
    // data
  }

  const selectFieldChanged = (e) => {
    basicCheck();
    modifyFn({
      ...data,
      [e.target.name]: e.target.value
    })
    // data[e.target.name] = e.target.value;
  }

  const dateFieldChanged = (id) => (dateObj) => {
    basicCheck();
    modifyFn({
      ...data,
      [id]: dateObj
    })
  };

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
              <TextField autoFocus required
                error={!data || data.company.length === 0} helperText={!data || data.company.length === 0 ? "This field is required" : ''}
                margin="dense" id="company" label="Company" type="text"
                defaultValue={data ? data.company : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.position.length === 0} helperText={!data || data.position.length === 0 ? "This field is required" : ''}
                margin="dense" id="position" label="Position" type="text"
                defaultValue={data ? data.position : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.type.length === 0} helperText={!data || data.type.length === 0 ? "This field is required" : ''}
                margin="dense" id="type" name="type" label="Type" select
                defaultValue={data ? data.type : ''} onChange={selectFieldChanged} fullWidth >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required
                error={!data || !data.start} helperText={!data || !data.start ? "This field is required" : ''}
                views={['year', 'month', 'date']}
                margin="dense" id="start" label="Start Date" disableFuture format="MMM DD, yyyy"
                value={data ? data.start : null} onChange={dateFieldChanged('start')} fullWidth />
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required
                error={!data || !data.end} helperText={!data || !data.end ? "This field is required" : ''}
                views={['year', 'month', 'date']}
                margin="dense" id="end" label="End Date" format="MMM DD, yyyy"
                value={data ? data.end : null} onChange={dateFieldChanged('end')} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.location.length === 0} helperText={!data || data.location.length === 0 ? "This field is required" : ''}
                margin="dense" id="location" label="Location" type="text"
                defaultValue={data ? data.location : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.description.length === 0} helperText={!data || data.description.length === 0 ? "This field is required" : ''}
                margin="dense" id="description" label="Description" type="text" multiline
                defaultValue={data ? data.description : ''} onChange={textFieldChanged} fullWidth />
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
  const [dummy, triggerReRender] = React.useState(0);

  const handleClose = () => {
    closeFn();
    // console.log(data);
    // setOpen(false);
  };

  const handleSave = () => {
    if (!validate(data, ['image'])) {
      triggerReRender(dummy + 1);
      return;
    }
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
    modifyFn({
      ...data,
      [e.target.id]: e.target.value
    })
    // data[e.target.id] = e.target.value;
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
              <TextField autoFocus required
                error={!data || data.university.length === 0} helperText={!data || data.university.length === 0 ? "This field is required" : ''}
                margin="dense" id="university" label="University" type="text"
                defaultValue={data ? data.university : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.degree.length === 0} helperText={!data || data.degree.length === 0 ? "This field is required" : ''}
                margin="dense" id="degree" label="Program" type="text"
                defaultValue={data ? data.degree : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <TextField required
                error={!data || data.major.length === 0} helperText={!data || data.major.length === 0 ? "This field is required" : ''}
                margin="dense" id="major" label="Major" type="text"
                defaultValue={data ? data.major : ''} onChange={textFieldChanged} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required
                error={!data || !data.startYear} helperText={!data || !data.startYear ? "This field is required" : ''}
                margin="dense" id="startYear" label="Start Year" views={["year"]} disableFuture
                value={data && data.startYear ? moment([data.startYear]) : null} onChange={dateFieldChanged('startYear')} fullWidth />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <DatePicker required
                error={!data || !data.endYear} helperText={!data || !data.endYear ? "This field is required" : ''}
                margin="dense" id="endYear" label="End Year" views={["year"]}
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
  // if (profileData.experience.length > 0 && profileData.experience[0].start._seconds != null) {
  //   profileData.experience.map((ex) => {
  //     console.log('map', firebaseDateToJSDateObj(ex.start));
  //     ex.start = moment(firebaseDateToJSDateObj(ex.start))
  //     ex.end = moment(firebaseDateToJSDateObj(ex.end))
  //   });
  // }
  profileData.experience.map((ex) => {
    ex.start = moment(ex.start);
    ex.end = moment(ex.end);
  });

  const [about, changeAbout] = React.useState(profileData.about);
  const [education, changeEducation] = React.useState(profileData.education);
  const [experience, changeExperience] = React.useState(profileData.experience);
  const [fullname, changeFullname] = React.useState(profileData.fullname);
  const [headline, changeHeadline] = React.useState(profileData.headline);
  const [location, changeLocation] = React.useState(profileData.location);

  const [image, changeImage] = React.useState(profileData.image);
  const [profileImageHovered, toggleHover] = React.useState(false);

  // For education edit
  const [edEdit, toggleEdEdit] = React.useState(false);
  const [edEditData, setEdEditData] = React.useState(null);
  const [edSelected, setEdSelected] = React.useState(-1);
  const showEdit = (ed, edIdx) => {
    setEdEditData(ed);
    setEdSelected(edIdx);
    console.log('from parent', edEditData, ed);
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


    fetch('/profiles/education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessInfo, education: edCopy })
    }).then((res) => {
      return res.json();
    }).then(success => {
      if (success.status === 200) {

        // get the image for the changed education
        fetch('/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queries: [newData.university.toLowerCase()] })
        }).then(res => res.json()).then(resp => {
          if (resp.status === 200) {
            edCopy = education.slice();
            newData.image = resp.data[newData.university.toLowerCase()]
            if (edSelected === -1) {
              edCopy.push(newData);
            } else {
              edCopy[edSelected] = newData;
            }
            edCopy.sort((a, b) => b.startYear - a.startYear);
          }
          changeEducation(edCopy);
        });
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


  // for experience
  const [exEdit, toggleExEdit] = React.useState(false);
  const [exEditData, setExEditData] = React.useState(null);
  const [exSelected, setExSelected] = React.useState(-1);
  const showExEdit = (ex, exIdx) => {
    setExEditData(ex);
    setExSelected(exIdx);
    toggleExEdit(true);
  }
  const closeExEdit = () => {
    toggleExEdit(false);
    // setExEditData(null);
  }
  const modifyEx = (newData) => {
    setExEditData({ ...exEditData, ...newData });
  }
  const saveEx = (newData) => {

    let exCopy = experience.slice();
    if (exSelected === -1) {
      exCopy.push(newData);
    } else {
      exCopy[exSelected] = newData;
    }
    exCopy.sort((a, b) => b.start - a.start);

    fetch('/profiles/experience', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessInfo, experience: exCopy })
    }).then((res) => {
      return res.json();
    }).then(success => {
      // console.log(JSON.stringify({ token: accessInfo, experience: exCopy }));
      // console.log('resp', success);
      if (success.status == 200) {

        // get the image for the changed education
        fetch('/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queries: [newData.company.toLowerCase()] })
        }).then(res => res.json()).then(resp => {
          if (resp.status === 200) {
            exCopy = experience.slice();
            newData.image = resp.data[newData.company.toLowerCase()]
            if (exSelected === -1) {
              exCopy.push(newData);
            } else {
              exCopy[exSelected] = newData;
            }
            exCopy.sort((a, b) => b.start - a.start);
          }
          changeExperience(exCopy);
        });

      } else {
        console.log('API error: ', success);
      }
    }, error => {
      console.log('Unknown error: ', error)
    });
  }
  const deleteEx = (exIdx) => {
    // deletes and copies
    let exCopy = experience.slice();
    exCopy.splice(exIdx, 1);

    fetch('/profiles/experience', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessInfo, experience: exCopy })
    }).then((res) => {
      return res.json();
    }).then(success => {
      if (success.status == 200) {
        changeExperience(exCopy);
      } else {
        console.log('API error: ', success);
      }
    }, error => {
      console.log('Unknown error: ', error)
    });
  }


  // for about, headline, and location
  const [bioEdit, toggleBioEdit] = React.useState(false);
  const [bioData, setBioData] = React.useState(null);
  // const [exSelected, setExSelected] = React.useState(-1);
  const showBioEdit = () => {
    setBioData({ headline, location, about });
    toggleBioEdit(true);
  }
  const closeBioEdit = () => {
    toggleBioEdit(false);
  }
  // const modifyBio = (field, newData) => {
  //   if (field === 'headline') {
  //     changeHeadline(newData);
  //   } else if (field === 'location') {
  //     changeLocation(newData);
  //   } else if (field === 'about') {
  //     changeAbout(newData);
  //   } else {
  //     console.assert(false, "Invalid modification", field, newData);
  //   }
  // }
  const saveBio = (newData) => {

    fetch('/profiles/bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessInfo, headline: newData.headline, location: newData.location, about: newData.about })
    }).then((res) => {
      return res.json();
    }).then(success => {
      if (success.status == 200) {
        changeHeadline(newData.headline);
        changeLocation(newData.location);
        changeAbout(newData.about);
      } else {
        console.log('API error: ', success);
      }
    }, error => {
      console.log('Unknown error: ', error)
    });
  }

  useEffect(() => {
    const compress = new Compress();
    compress.attach('#profile-photo-input', {
      maxHeight: 100,
      maxWidth: 100,
      resize: true,
      size: 0.5,
      quality: 1
    }).then((data) => {
      const base64Image = data[0].prefix + data[0].data;
      fetch('/profiles/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessInfo, image: base64Image })
      }).then((res) => {
        return res.json();
      }).then(success => {
        if (success.status == 200) {
          changeImage(base64Image);
        } else {
          console.log('API error: ', success);
        }
      }, error => {
        console.log('Unknown error: ', error)
      });
    });
  });


  return (
    // <div className="body-content profile">
    //   <h1>Profile!</h1>
    // </div>
    <div className="body-content">
      <ThemeProvider theme={BurhanGlobalTheme}>
        {
          !isUsername && <EducationEdit
            open={edEdit}
            data={edEditData}
            closeFn={() => { closeEdEdit() }}
            modifyFn={(newData) => { modifyEd(newData) }}
            saveFn={(newData) => { saveEd(newData) }}
          />
        }

        {
          !isUsername && <ExperienceEdit
            open={exEdit}
            data={exEditData}
            closeFn={() => { closeExEdit() }}
            modifyFn={(newData) => { modifyEx(newData) }}
            saveFn={(newData) => { saveEx(newData) }}
          />
        }

        {
          !isUsername && bioData && <BioEdit
            open={bioEdit}
            data={bioData}
            closeFn={closeBioEdit}
            // modifyFn={modifyBio}
            saveFn={saveBio}
          />
        }

        <Grid container spacing={1} style={{ height: '100%', width: '100%', padding: 8 }}>
          <Grid item xs={12} sm={4}>
            <Card elevation={3}>
              <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <input accept="image/*" className={classes.input} id="profile-photo-input" type="file" style={{ display: 'none' }} />
                <label htmlFor="profile-photo-input" className={classes.centerContainer}>
                  <IconButton color="primary" aria-label="upload picture" component="span" className={classes.largeAvatar}
                    onMouseOver={(e) => { toggleHover(true) }} onMouseOut={(e) => { toggleHover(false) }} >
                    {
                      !isUsername && profileImageHovered ?
                        <PhotoCamera /> :
                        <Avatar alt="B" className={classes.largeAvatar} src={image} />
                    }
                  </IconButton>
                </label>

                <Typography align="center" variant="h4" style={{ paddingTop: 20 }}>
                  {fullname}
                </Typography>
                <div style={{ display: 'flex' }}>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ paddingTop: 20 }}>
                      {headline}
                    </Typography>
                    <Typography align="right" variant="subtitle2" className={classes.lightGreyText}>
                      {location}
                    </Typography>
                  </div>
                  {
                    !isUsername && <IconButton aria-label="edit" style={{ alignSelf: 'center' }} onClick={() => { showBioEdit() }}>
                      <Edit />
                    </IconButton>
                  }
                </div>

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

                <div style={{ display: 'flex' }}>
                  <Typography variant="overline" style={{ flexGrow: 1 }}>
                    Experience
                  </Typography>
                  {
                    !isUsername && experience.length > 0 &&
                    <IconButton aria-label="add" style={{ alignSelf: 'start' }} onClick={() => { showExEdit(null, -1) }}>
                      <Add />
                    </IconButton>
                  }
                </div>

                {
                  experience.length == 0 &&
                  <Button variant="contained" color="primary" style={{ width: 'fit-content' }} onClick={() => { showExEdit(null, -1) }}>
                    Add Experience
                  </Button>
                }

                {experience.map((ex, exIdx) => (
                  <div key={ex.start.unix()} style={{ display: 'flex' }}>
                    <Grid container spacing={0} wrap="nowrap" key={ex.start._seconds} className={classes.detailBox}>
                      <Grid item style={{ width: 75 }}>
                        <Avatar variant="square" src={ex.image}>{ex.company.charAt(0)}</Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">{ex.position}</Typography>
                        <Typography variant="body2">{ex.company} - {ex.type}</Typography>
                        <Typography variant="subtitle2" className={classes.lightGreyText}>
                          {ex.start.format(MOMENT_DATE_OPTIONS) + " - " + ex.end.format(MOMENT_DATE_OPTIONS)}
                        </Typography>
                        <Typography variant="subtitle2" className={classes.lightGreyText}>{ex.location}</Typography>
                        <Typography>{ex.description}</Typography>
                      </Grid>
                    </Grid>
                    {
                      !isUsername && <>
                        <IconButton aria-label="edit" edge="end" style={{ alignSelf: 'start' }} onClick={() => { showExEdit(ex, exIdx) }}>
                          <Edit />
                        </IconButton>
                        <ConfirmDialog
                          title="Are you sure you want to delete the experience?"
                          content=""
                          yesFn={() => { deleteEx(exIdx) }}
                          noFn={() => { }}
                        >
                          <IconButton aria-label="delete" edge="end" style={{ alignSelf: 'start' }}>
                            <Delete />
                          </IconButton>
                        </ConfirmDialog>
                      </>
                    }
                  </div>
                ))}

                <div style={{ display: 'flex' }}>
                  <Typography variant="overline" style={{ flexGrow: 1 }}>
                    Education
                  </Typography>
                  {
                    !isUsername && education.length > 0 &&
                    <IconButton aria-label="add" style={{ alignSelf: 'start' }} onClick={() => { showEdit(null, -1) }}>
                      <Add />
                    </IconButton>
                  }
                </div>

                {
                  education.length == 0 &&
                  <Button variant="contained" color="primary" style={{ width: 'fit-content' }} onClick={() => { showEdit(null, -1) }}>
                    Add Education
                  </Button>
                }

                {education.map((ed, edIdx) => (
                  <div key={ed.startYear} style={{ display: 'flex' }}>
                    <Grid container spacing={0} wrap="nowrap" className={classes.detailBox} style={{ flexGrow: 1 }}>
                      <Grid item style={{ width: 75 }}>
                        <Avatar variant="square" src={ed.image}>
                          {ed.university.charAt(0)}
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">{ed.university}</Typography>
                        <Typography variant="body2">{ed.degree} - {ed.major}</Typography>
                        <Typography variant="subtitle2" className={classes.lightGreyText}>{ed.startYear} - {ed.endYear}</Typography>
                      </Grid>
                    </Grid>
                    {
                      !isUsername && <>
                        <IconButton aria-label="edit" edge="end" style={{ alignSelf: 'start' }} onClick={() => { showEdit(ed, edIdx) }}>
                          <Edit />
                        </IconButton>

                        <ConfirmDialog
                          title="Are you sure you want to delete the education?"
                          content=""
                          yesFn={() => { deleteEd(edIdx) }}
                          noFn={() => { }}
                        >
                          <IconButton aria-label="delete" edge="end" style={{ alignSelf: 'start' }}>
                            <Delete />
                          </IconButton>
                        </ConfirmDialog>

                      </>
                    }
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