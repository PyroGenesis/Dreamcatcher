import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, IconButton } from "@material-ui/core";
import { logout } from '../context/actions'
import { makeStyles } from '@material-ui/core/styles';
import { useAuthDispatch, useAuthState } from '../context/context';
import {checkToken} from '../context/actions'
import logo from '../assets/logo.png'
import CollapsedNavbar from './collapsed-navbar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // position: "absolute",
    // right: 0
  },
  logo: {
    height: theme.spacing(5),
    marginTop: theme.spacing(0.5)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  darkBackground: {
    backgroundColor: theme.palette.primary.dark
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  // const [tokenStatus, setTokenStatus] = useState('');
  // const [isLoading, setLoading] = useState(true);

  const userDetails = useAuthState()
  const dispatch = useAuthDispatch();


  const handleLogout = () => {
    //setTokenStatus('');
    logout(dispatch); 
  }

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

  return (
    <div className={classes.root}>
      <CollapsedNavbar/>
      <AppBar position="static" elevation={0} className={classes.navBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Button color="inherit" href="/">
                <img src={logo} alt="Logo" className={classes.logo}/>
              </Button>
            </Typography>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/dashboard">Dashboard</Button>
            <Button color="inherit" href="/profile">Profile</Button>
            <Button color="inherit" href="/positions">Positions</Button>
            <Button color="inherit" href="/forums">Forums</Button>
            <Button color="inherit" href="/about">About</Button>
            { userDetails.token 
              ? <Button color="inherit" onClick={handleLogout}>Logout</Button>
              : null
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}

// class Navbar extends Component {
  // constructor(props) {
  //   super(props);
  //   const classes = useStyles();
  // }

  // render() {
    // const classes = useStyles();



    //   <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">Landing</Link>
    //     </li>
    //     <li>
    //       <Link to="/dashboard">Dashboard</Link>
    //     </li>
    //     <li>
    //       <Link to="/profile">Profile</Link>
    //     </li>
    //     <li>
    //       <Link to="/positions">Positions</Link>
    //     </li>
    //     <li>
    //       <Link to="/forums">Forums</Link>
    //     </li>
    //     <li>
    //       <Link to="/about">About</Link>
    //     </li>
    //   </ul>
    // </nav>
//     )
//   }
// }

// export default Navbar