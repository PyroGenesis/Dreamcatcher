import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import Login from './page-login';
import SignUp from "./page-signup";
import '../App.scss';
import { CardContent, Link, Grid } from '@material-ui/core';
import { useAuthState, useAuthDispatch } from '../context/context';
import { checkToken } from '../context/actions';


export default function LandingPageNew(props) {
    const [toggle, setToggle] = useState(true);
    const [tokenStatus, setTokenStatus] = useState('');
    const [isLoading, setLoading] = useState(true);

    const toggleChecked = () => {
        setToggle(toggle => !toggle);
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
    if(userDetails.token) {
      props.history.push('/dashboard');
      return null;
    }
    else {
      return (
        <header className="body-content App-header">
          <Grid container style={{margin: 0, width: '100%'}} justify="center" spacing={3} alignItems="center">
            <Grid item xs={9} align="center">
              <h1 style={{fontFamily:"Comfortaa", fontSize:80}}> Dreamcatcher</h1>
              <h3 style={{fontFamily:"Montserrat", fontSize:20}}> Get help on your path to acquiring your dream job</h3>
            </Grid>
            <Grid item xs align="center">
              <Card elevation={13} style={{minWidth: 300, maxWidth: 300}}>
                <CardContent>        
                  { toggle && <div>
                      <Login/> 
                      <Link style={{fontSize: 18}} onClick = {toggleChecked}> New user? Click here to sign up </Link> 
                    </div> }
                  { !toggle && <div>
                    <SignUp/>
                      <Link style={{fontSize: 17}} onClick = {toggleChecked}> Returning user? Click here to log in </Link> 
                    </div> }
                </CardContent>
              </Card>      
            </Grid>
          </Grid>    
        </header>
      );
    }
}