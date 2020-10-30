import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import SignupForm from './page-signup';
import LoginForm from './page-login';
import '../App.scss';
import { CardContent, Link, Grid } from '@material-ui/core';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'login',
    };
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
  }

  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    })
  };

  showSignupForm() {
    if(this.state.formType === 'login') {
      this.setState({
        formType: 'signup'
      })
    }
  }

  showLoginForm() {
    if(this.state.formType === 'signup') {
      this.setState({
        formType: 'login'
      })
    }
  }

  render() {
    return (
        <header className="" className="body-content App-header">
          <Grid container style={{margin: 0, width: '100%'}} justify="center" spacing={3} alignItems="center">
            <Grid item xs={9} align="center">
              <h1 style={{fontFamily:"Comfortaa", fontSize:80}}> Dreamcatcher</h1>
              <h3 style={{fontFamily:"Montserrat", fontSize:20}}> Get help on your path to acquiring your dream job</h3>
            </Grid>
            <Grid item xs align="center">
              <Card elevation={13} style={{minWidth: 300, maxWidth: 300}}>
                <CardContent>
                  {this.state.formType === 'login' ?
                    <div>
                      <LoginForm onChange = { fields => this.onChange(fields) }/> 
                      <Link style={{fontSize: 18}} onClick = {this.showSignupForm}> New user? Click here to sign up </Link> 
                    </div> :
                    <div>
                    <SignupForm 
                        onChange = { fields => this.onChange(fields) }/>
                      <Link style={{fontSize: 17}} onClick = {this.showLoginForm}> Returning user? Click here to log in </Link> 
                    </div>
                  }
                </CardContent>
              </Card>      
            </Grid>
          </Grid>    
        </header>
    );
  }
}

export default LandingPage