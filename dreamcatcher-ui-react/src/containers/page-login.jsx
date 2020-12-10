import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginUser } from '../context/actions';
import { useAuthDispatch, useAuthState } from '../context/context';
import ErrorDialog from '../components/error-dialog';

function Login(props) {

    const[email, setEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState() //read the values of loading and errorMessage from context
    
    const validateInput = async() => {
    
        let isError = false;
        const errors = {
            emailError: '',
            passwordError: '',
        };
    
        if(password.length < 5) {
            isError = true;
            errors.passwordError = 'Password needs to be atleast 5 characters long.'
        }

        setEmailError(errors.emailError);
        setPasswordError(errors.passwordError);

        return isError;
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
    
        const err = await validateInput();
    
        if(!err) {

            let payload = { email, password }
            try {
                let response = await loginUser(dispatch, payload);
                if(!response) {
                    return;
                }
                props.history.push("/dashboard");
            } catch(error) {

                // alert(error.message)

                // var errorCode = error.code;
                // var errorMessage = error.message;
    
                setErrorDialog(true);
                setLoginErrorMessage(error.message)

                // // alert(errorMessage);    
    
                // console.log(errorCode);
                // console.log(errorMessage);
                // console.log(error);
            }

            setEmail('');
            setPassword('');
            setEmailError('');
            setPasswordError('');

        }
    }

    return (
        <div>
            { errorDialog ? <ErrorDialog dialog={errorDialog} setDialog={(e)=>setErrorDialog(e)} value={loginErrorMessage}/> : null }
            <form>
                <TextField 
                    name = 'email' 
                    type = 'email'
                    label = 'Email' 
                    value = { email } 
                    error = { emailError.length === 0 ? false : true }
                    helperText = { emailError }
                    onChange = {e => setEmail(e.target.value) } 
                    disabled = {loading}
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
                    disabled = {loading}
                    required
                    />
                <br />
                <Button style={{marginTop: '30px', marginBottom: '20px'}} variant="contained" color="primary" onClick={onSubmit} disabled={loading}> Login </Button>
            </form>
        </div>
    );
}

export default withRouter(Login);