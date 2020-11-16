import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../components/firebase'
import { withRouter } from 'react-router';


export class LoginForm extends React.Component {

    state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    };

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validateInput = () => {

        let isError = false;
        const errors = {
            emailError: '',
            passwordError: '',
        };

        if(this.state.password.length < 5) {
            isError = true;
            errors.passwordError = 'Password needs to be atleast 5 characters long.'
        }
        
        this.setState(errors);
        return isError;
    }

    onSubmit = e => {
        e.preventDefault();

        const err = this.validateInput();

        if(!err) {
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                alert('You have successfully signed in!');
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage);

                console.log(errorCode);
                console.log(errorMessage);
                console.log(error);
            }); 

            this.setState({
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
            });
            this.props.onChange({
                email: '',
                password: '',
            })
        }
    }

    render() {

        return (
            <form  onSubmit = {e => this.onSubmit(e)}>
                <TextField 
                    name = 'email' 
                    type = 'email'
                    label = 'Email' 
                    value = { this.state.email } 
                    error = { this.state.emailError.length === 0 ? false : true }
                    helperText = { this.state.emailNameError }
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
                <Button style={{marginTop: '30px', marginBottom: '20px'}} variant="contained" color="primary" type="submit" > Login </Button>
            </form>
        );
    }
}

export default withRouter(LoginForm);