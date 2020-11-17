import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../context/actions';

import { useAuthDispatch, useAuthState } from '../context/context';

function SignUp(props) {

    const[firstName, setFirstName] = useState('');
    const[firstNameError, setFirstNameError] = useState('');
    const[lastName, setLastName] = useState('');
    const[lastNameError, setLastNameError] = useState('');
    const[userName, setUserName] = useState('');
    const[userNameError, setUserNameError] = useState('');
    const[email, setEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState('');

    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState() //read the values of loading and errorMessage from context

    const validateInput = async() => {

        let isError = false;
        const errors = {
            firstNameError: '',
            lastNameError: '',
            userNameError: '',
            emailError: '',
            passwordError: '',
        };

        if(userName.length < 5) {
            isError = true;
            errors.userNameError = 'Username needs to be atleast 5 characters long.'
        }

        if(password.length < 5) {
            isError = true;
            errors.passwordError = 'Password needs to be atleast 5 characters long.'
        }

        if(firstName.length < 5) {
            isError = true;
            errors.firstNameError = 'First name needs to be atleast 5 characters long.'
        }

        if(lastName.length < 5) {
            isError = true;
            errors.lastNameError = 'Last name needs to be atleast 5 characters long.'
        }
        
        setFirstNameError(errors.firstNameError);
        setLastNameError(errors.lastNameError);
        setUserNameError(errors.userNameError);
        setEmailError(errors.emailError);
        setPasswordError(errors.passwordError);

        return isError;
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        const err = await validateInput();

        if(!err) {
            
            const additionalData = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
            }

            const loginDetails = {
                email: email,
                password: password
            }

            try {
                let response = await signUpUser(dispatch, loginDetails, additionalData);
                if(!response) {
                    return;
                }
                props.history.push("/dashboard");

            } catch(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage);

                console.log(errorCode);
                console.log(errorMessage);
                console.log(error);
            }

            setFirstName('');
            setLastName('');
            setUserName('');
            setEmail('');
            setPassword('');            
            setFirstNameError('');
            setLastNameError('');
            setUserNameError('');
            setEmailError('');
            setPasswordError('');            
        }
    }

    return (
        <form>
            <TextField 
                name="firstName" 
                label="First Name"
                value = { firstName } 
                onChange = {e => setFirstName(e.target.value) } 
                error = { firstNameError.length === 0 ? false : true }
                helperText = { firstNameError } 
                required 
                />
            <br />
            <TextField 
                name = 'lastName'
                label = 'Last Name' 
                value = { lastName } 
                onChange = {e => setLastName(e.target.value) }
                error = { lastNameError.length === 0 ? false : true }
                helperText = { lastNameError } 
                required
                />
            <br />
            <TextField 
                name = 'userName' 
                label = 'User Name' 
                value = { userName } 
                error = { userNameError.length === 0 ? false : true }
                helperText = { userNameError }
                onChange = {e => setUserName(e.target.value) } 
                required
                />
            <br />
            <TextField 
                name = 'email' 
                type = 'email'
                label = 'Email' 
                value = { email } 
                error = { emailError.length === 0 ? false : true }
                helperText = { emailError }                    
                onChange = {e => setEmail(e.target.value) } 
                required
                />
            <br />
            <TextField 
                name = 'password' 
                type = 'password'
                label = 'Password' 
                value = { password } 
                error = { passwordError.length === 0 ? false : true }
                helperText = { passwordError }
                onChange = {e => setPassword(e.target.value) } 
                required
                />
            <br />
            <Button style={{marginTop: '30px', marginBottom: '20px'}} variant="contained" color="primary" onClick={onSubmit} > Sign up </Button>
        </form>
    );
}

export default withRouter(SignUp)