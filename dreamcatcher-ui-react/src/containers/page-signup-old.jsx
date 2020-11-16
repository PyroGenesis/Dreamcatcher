import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { auth, createUserProfileDocument } from '../components/firebase'

export class SignupForm extends React.Component {

    state = {
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        userName: '',
        userNameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    };

    change = e => {

        const err = this.validateInput();

        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validateInput = () => {

        let isError = false;
        const errors = {
            firstNameError: '',
            lastNameError: '',
            userNameError: '',
            emailError: '',
            passwordError: '',
        };

        if(this.state.userName.length < 5) {
            isError = true;
            errors.userNameError = 'Username needs to be atleast 5 characters long.'
        }

        if(this.state.password.length < 5) {
            isError = true;
            errors.passwordError = 'Password needs to be atleast 5 characters long.'
        }

        if(this.state.firstName.length < 5) {
            isError = true;
            errors.firstNameError = 'First name needs to be atleast 5 characters long.'
        }

        if(this.state.lastName.length < 5) {
            isError = true;
            errors.lastNameError = 'Last name needs to be atleast 5 characters long.'
        }
        
        this.setState(errors);
        return isError;
    }

    onSubmit = e => {
        e.preventDefault();

        const err = this.validateInput();

        if(!err) {
            
            const additionalData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                email: this.state.email,
            }

            const loginDetails = {
                email: this.state.email,
                password: this.state.password
            }

            auth.createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
            .then(res => {
                alert('You have successfully signed up!');

                createUserProfileDocument(res, additionalData);
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
                } else {
                  alert(errorMessage);
                }
                console.log(error);
            }); 


            this.setState({
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                userName: '',
                userNameError: '',
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
            });
            this.props.onChange({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
            })
        }
    }

    render() {

        return (
            <form onSubmit = {e => this.onSubmit(e)}>
                <TextField 
                    name="firstName" 
                    label="First Name"
                    value = { this.state.firstName } 
                    onChange = {e => this.change(e) } 
                    error = { this.state.firstNameError.length === 0 ? false : true }
                    helperText = { this.state.firstNameError } 
                    required 
                    />
                <br />
                <TextField 
                    name = 'lastName'
                    label = 'Last Name' 
                    value = { this.state.lastName } 
                    onChange = {e => this.change(e) }
                    error = { this.state.lastNameError.length === 0 ? false : true }
                    helperText = { this.state.lastNameError } 
                    required
                    />
                <br />
                <TextField 
                    name = 'userName' 
                    label = 'User Name' 
                    value = { this.state.userName } 
                    error = { this.state.userNameError.length === 0 ? false : true }
                    helperText = { this.state.userNameError }
                    onChange = {e => this.change(e) } 
                    required
                    />
                <br />
                <TextField 
                    name = 'email' 
                    type = 'email'
                    label = 'Email' 
                    value = { this.state.email } 
                    error = { this.state.emailError.length === 0 ? false : true }
                    helperText = { this.state.emailError }                    
                    onChange = {e => this.change(e) } 
                    required
                    />
                <br />
                <TextField 
                    name = 'password' 
                    type = 'password'
                    label = 'Password' 
                    value = { this.state.password } 
                    error = { this.state.passwordError.length === 0 ? false : true }
                    helperText = { this.state.passwordError }
                    onChange = {e => this.change(e) } 
                    required
                    />
                <br />
                <Button style={{marginTop: '30px', marginBottom: '20px'}} variant="contained" color="primary" type="submit" > Sign up </Button>
            </form>
        );
    }
}

export default withRouter(SignupForm);