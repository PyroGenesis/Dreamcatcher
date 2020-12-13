import React, {useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import { useAuthState } from '../context/context';
import firebase from 'firebase/app';
import "firebase/firestore";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export default function PositionsDialog(props) {
    
    const userDetails = useAuthState();

    const [companyName, setCompanyName] = useState('')
    const [positionName, setPositionName] = useState('')
    const [positionLink, setPositionLink] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [positionType, setPositionType] = useState('')
    const [positionLevel, setPositionLevel] = useState('')
    const [positionDuration, setPositionDuration] = useState('')

    const [companyNameError, setCompanyNameError] = useState('')
    const [positionNameError, setPositionNameError] = useState('')
    const [positionLinkError, setPositionLinkError] = useState('')
    const [jobDescriptionError, setJobDescriptionError] = useState('')
    const [positionTypeError, setPositionTypeError] = useState('')
    const [positionLevelError, setPositionLevelError] = useState('')
    const [positionDurationError, setPositionDurationError] = useState('')

    const validateInput = () => {

        let isError = false;
        
        const errors = {
            companyNameError: '',
            positionNameError: '',
            positionLinkError: '',
            jobDescriptionError: '',
            positionTypeError: '',
            positionLevelError: '',
            positionDurationError: ''
        };

        if(companyName.length < 2) {
            isError = true;
            errors.companyNameError = 'Company name must be at least 2 characters long'
        }

        if(positionName.length < 3) {
            isError = true;
            errors.positionNameError = 'Position name must be at least 3 characters long'
        }

        // let urlRegex = '/(https?:\/\/[^\s]+)/g';
        
        if(positionLink.match(/(https?:\/\/[^\s]+)/g) === null) {
            isError = true;
            errors.positionLinkError = 'Position link must be a valid link'
        }

        if(jobDescription.length < 10) {
            isError = true;
            errors.jobDescriptionError = 'Job description must be at least 10 characters long'
        }

        if(positionType === "") {
            isError = true;
            errors.positionTypeError = 'Please select a valid type'
        }

        if(positionLevel === "") {
            isError = true;
            errors.positionLevelError = 'Please select a valid type'
        }

        if(positionDuration === "") {
            isError = true;
            errors.positionDurationError = 'Please select a valid type'
        }

        setCompanyNameError(errors.companyNameError)
        setPositionNameError(errors.positionNameError)
        setPositionLinkError(errors.positionLinkError)
        setJobDescriptionError(errors.jobDescriptionError)
        setPositionTypeError(errors.positionTypeError)
        setPositionLevelError(errors.positionLevelError)
        setPositionDurationError(errors.positionDurationError)

        return isError;
    }

    const submitPosition = async() => {

        const err = validateInput()

        if(!err) {

            let position_name_array = positionName.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ")

            const company_name_array = companyName.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ")

            position_name_array = position_name_array.concat(company_name_array)

            const db = firebase.firestore();

            const positionRef = db.collection('positions').doc()
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: userDetails.token })
            }

            const response = await fetch('/auth/getUsername', requestOptions)
            const usernameObj = await response.json()

            let searchKey = props.searchValue.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ")

            positionRef.set({  
                position_type: "Software Engineering",
                username: usernameObj.data.username,
                company_name: companyName,
                description: jobDescription,
                link: positionLink,
                position_name: positionName,
                position_name_array: position_name_array,
                position_type: positionType,
                position_level: positionLevel,
                position_duration: positionDuration
            }).then(() => {
                // console.log(searchKey)

                if(props.searchValue === "" || searchKey.some(elem => position_name_array.includes(elem))) {    
                    props.addPosition({
                        id: positionRef.id,
                        username: usernameObj.data.username,
                        companyName: companyName,
                        desc: jobDescription,
                        link: positionLink,
                        positionName: positionName,
                        positionLevel: positionLevel,
                        positionDuration: positionDuration
                    })
                }
            })

            props.setDialog(false)
        }

        // alert("Submitted")
    }

    return(
        <Dialog open={props.dialog} maxWidth={"lg"} fullWidth={true} onClose={()=>{props.setDialog(false)}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">
                    Position Name
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="positionName"
                    placeholder="Enter position title here..."
                    type="text"
                    fullWidth
                    value = {positionName}
                    onChange = {e => setPositionName(e.target.value)}
                    style={{marginBottom: 20}}
                    error={positionNameError.length === 0 ? false : true}
                    helperText={positionNameError}
                />
                <Typography variant="subtitle2">
                    Company Name
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="companyName"
                    placeholder="Enter company name here..."
                    type="text"
                    fullWidth
                    value = {companyName}
                    onChange = {e => setCompanyName(e.target.value)}
                    style={{marginBottom: 20}}
                    error={companyNameError.length === 0 ? false : true}
                    helperText={companyNameError}
                />
                <Typography variant="subtitle2">
                    Job Description
                </Typography>
                <TextField
                    margin="dense"
                    id="jobDescription"
                    placeholder="Enter job description here..."
                    type="text"
                    fullWidth
                    multiline
                    rowsMax={15}
                    value = {jobDescription}
                    onChange = {e => setJobDescription(e.target.value)}
                    style={{marginBottom: 20}}
                    error={jobDescriptionError.length === 0 ? false : true}
                    helperText={jobDescriptionError}
                />
                <Typography variant="subtitle2">
                    Link to Application
                </Typography>
                <TextField
                    margin="dense"
                    id="positionLink"
                    placeholder="Enter link to application here..."
                    type="text"
                    fullWidth
                    value = {positionLink}
                    onChange = {e => setPositionLink(e.target.value)}
                    style={{marginBottom: 20}}
                    error={positionLinkError.length === 0 ? false : true}
                    helperText={positionLinkError}
                />
                <Typography variant="subtitle2">
                    Position Type
                </Typography>
                <Select displayEmpty value={positionType} onChange={(e)=>setPositionType(e.target.value)} error={positionTypeError.length === 0 ? false : true}>
                    <MenuItem value=""> <em>None</em> </MenuItem>
                    <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                    <MenuItem value={'Web'}>Web</MenuItem>
                    <MenuItem value={'Machine Learning'}>Machine Learning</MenuItem>
                    <MenuItem value={'Full Stack'}>Full Stack</MenuItem>
                </Select>
                <FormHelperText style={{color: 'red', marginBottom: '20px'}}> {positionTypeError} </FormHelperText>
                <Typography variant="subtitle2">
                    Position Level
                </Typography>
                <Select displayEmpty value={positionLevel} onChange={(e)=>setPositionLevel(e.target.value)} error={positionLevelError.length === 0 ? false : true}>
                    <MenuItem value=""> <em>None</em> </MenuItem>
                    <MenuItem value={'Entry'}>Entry</MenuItem>
                    <MenuItem value={'Mid-level'}>Mid-level</MenuItem>
                    <MenuItem value={'Senior'}>Senior</MenuItem>
                </Select>
                <FormHelperText style={{color: 'red', marginBottom: '20px'}}> {positionLevelError} </FormHelperText>
                <Typography variant="subtitle2">
                    Position Duration
                </Typography>
                <Select displayEmpty value={positionDuration} onChange={(e)=>setPositionDuration(e.target.value)} error={positionDurationError.length === 0 ? false : true}>
                    <MenuItem value=""> <em>None</em> </MenuItem>
                    <MenuItem value={'Full-time'}>Full-time</MenuItem>
                    <MenuItem value={'Part-time'}>Part-time</MenuItem>
                    <MenuItem value={'Contract'}>Contract</MenuItem>
                </Select>
                <FormHelperText style={{color: 'red', marginBottom: '20px'}}> {positionDurationError} </FormHelperText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={submitPosition}>
                    Submit
                </Button>
            </DialogActions>
      </Dialog>
    )
}