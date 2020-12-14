import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Login from './page-login';
import SignUp from "./page-signup";
import '../App.scss';
import { CardContent, Link, Grid, ThemeProvider } from '@material-ui/core';
import { useAuthState, useAuthDispatch } from '../context/context';
import { checkToken } from '../context/actions';
import { CardMedia } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import logo from '../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  logo: {
    // width: theme.spacing(80),
    width: '50vw',
    marginBottom: theme.spacing(2)
  }
}));

export default function LandingPageNew(props) {
    const classes = useStyles();

    const [toggleSignUp, setToggleSignUp] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(true);

    const [tokenStatus, setTokenStatus] = useState('');
    const [isLoading, setLoading] = useState(true);

    const toggleChecked = () => {
      setToggleLogin(toggleLogin => !toggleLogin);
      setToggleSignUp(toggleSignUp => !toggleSignUp);
    }
    
    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();

    // useEffect(() => {
    //   (async function() {
    //     const tokenStatus = await checkToken(dispatch, userDetails.token);
    //     setTokenStatus(tokenStatus);
    //     setLoading(false);
    //   })();
    // }, [])

    // if(isLoading) {
    //   return <div className="App">Loading...</div>;
    // }

    // if(tokenStatus === 'success') {
    /* if(userDetails.token) {
       props.history.push('/dashboard');
       return null;
    } 
    else { */
      return (
        <header className="body-content App-header">
          <Grid container style={{margin: 0, width: '100%'}} justify="center" spacing={3} alignItems="center">
            <Grid item xs={9} align="center">
              {/* <h1 style={{fontFamily:"Comfortaa", fontSize:80}}> Dreamcatcher</h1> */}
              <img src={logo} alt="Logo" className={classes.logo}/>
              <h3 style={{fontFamily:"Montserrat", fontSize:18}}> Get help on your path to acquiring your dream job</h3>
            </Grid>
            <Grid item xs align="center">
              <Card elevation={13} style={{minWidth: 300, maxWidth: 300}}>
                <CardContent>        
                  { toggleLogin && <div>
                      <Login/> 
                      <Link style={{fontSize: 18}} onClick = {toggleChecked}> New user? Click here to sign up </Link> 
                    </div> }
                  { toggleSignUp && <div>
                    <SignUp/>
                      <Link style={{fontSize: 17}} onClick = {toggleChecked}> Returning user? Click here to log in </Link> 
                    </div> }
                </CardContent>
              </Card>      
            </Grid>
          </Grid>    
        </header>
      );
    // }
}