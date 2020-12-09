import React, { Component, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, AppBar, Toolbar, Button, Typography, IconButton, createMuiTheme } from "@material-ui/core";
import { logout } from '../context/actions'
import { makeStyles } from '@material-ui/core/styles';
import { useAuthDispatch, useAuthState } from '../context/context';
import { checkToken } from '../context/actions'
import logo from '../assets/logo.png'
import CollapsedNavbar from './collapsed-navbar';

// This function is insane: https://stackoverflow.com/a/45402026/7120031
const toolbarRelativeProperties = (property, modifier = value => value) => theme =>
  Object.keys(theme.mixins.toolbar).reduce((style, key) => {
    const value = theme.mixins.toolbar[key];
    if (key === 'minHeight') {
      return { ...style, [property]: modifier(value) };
    }
    if (value.minHeight !== undefined) {
      return { ...style, [key]: { [property]: modifier(value.minHeight) } };
    }
    return style;
  }, {});

// console.log('height', toolbarRelativeProperties('height',  value => value)(createMuiTheme()));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: theme.spacing(5),
    marginTop: theme.spacing(0.5)
  },
  button: {
    minHeight: '100%',
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.dark
    }
  },
  highlightedButton: {
    backgroundColor: theme.palette.secondary.dark
  },
  
  title: {
    flexGrow: 1,
  },
  navBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    ...toolbarRelativeProperties('height',  value => value)(theme)
  }
}));

export default function Navbar(props) {
  const path = useLocation().pathname;
  
  /**
   * Home, Dashboard
   * Profile
   * Positions
   * Forums
   * About
   */
  let selectedPage = 1  // By default it is the Dashboard as they are just too many possible prefixes here
  if (path.startsWith('/profile')) {
    selectedPage = 2;
  } else if (path.startsWith('/positions')) {
    selectedPage = 3;
  } else if (path.startsWith('/post') || path.startsWith('/forums')) {
    selectedPage = 4;
  } else if (path.startsWith('/about')) {
    selectedPage = 5;
  }
  // We dont really care about logout

  const classes = useStyles();

  // const [tokenStatus, setTokenStatus] = useState('');
  // const [isLoading, setLoading] = useState(true);

  const userDetails = useAuthState();
  const dispatch = useAuthDispatch();
  const isLoggedIn = userDetails.token ? true : false


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
    <>
      <CollapsedNavbar selectedPage={selectedPage} />
      <AppBar position="static" elevation={0} className={classes.navBar}>
        <Toolbar style={{height: '100%'}} /** Note that here the height can be 100% because AppBar actually stole the height of Toolbar */>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" href="/">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Button>
          </Typography>
          {!isLoggedIn && <Button color="inherit" className={classes.button} href="/">Home</Button>}
          {isLoggedIn && <>
            <Button color="inherit" className={classes.button + (selectedPage===1 ? ` ${classes.highlightedButton}`:'')} href="/dashboard">Dashboard</Button>
            <Button color="inherit" className={classes.button + (selectedPage===2 ? ` ${classes.highlightedButton}`:'')} href="/profile">Profile</Button>
            <Button color="inherit" className={classes.button + (selectedPage===3 ? ` ${classes.highlightedButton}`:'')} href="/positions">Positions</Button>
            <Button color="inherit" className={classes.button + (selectedPage===4 ? ` ${classes.highlightedButton}`:'')} href="/forums">Forums</Button>
          </>}
          <Button color="inherit" className={classes.button + (selectedPage===5 ? ` ${classes.highlightedButton}`:'')} href="/about">About</Button>
          {isLoggedIn
            ? <Button color="inherit" className={classes.button} onClick={handleLogout}>Logout</Button>
            : null
          }
        </Toolbar>
      </AppBar>
    </>
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