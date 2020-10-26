import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class LoginForm extends React.Component {

    state = {
        userName: '',
        userNameError: '',
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
            userNameError: '',
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
        
        this.setState(errors);
        return isError;
    }

    onSubmit = e => {
        e.preventDefault();

        const err = this.validateInput();

        if(!err) {
            this.setState({
                userName: '',
                userNameError: '',
                password: '',
                passwordError: '',
            });
            this.props.onChange({
                userName: '',
                password: '',
            })
        }
    }

    render() {

        return (
            <form>
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
                <Button style={{marginTop: '30px', marginBottom: '20px'}} variant="contained" color="primary" onSubmit = {e => this.onSubmit(e)} type="submit" > Login </Button>
            </form>
        );
    }
}