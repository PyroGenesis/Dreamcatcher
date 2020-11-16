import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { logout } from '../context/actions'
import { makeStyles } from '@material-ui/core/styles';
import { useAuthDispatch, useAuthState } from '../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

export default function Navbar(props) {
  const classes = useStyles();

  const userDetails = useAuthState()
  const dispatch = useAuthDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dreamcatcher
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/dashboard">Dashboard</Button>
          <Button color="inherit" href="/profile">Profile</Button>
          <Button color="inherit" href="/positions">Positions</Button>
          <Button color="inherit" href="/forums">Forums</Button>
          <Button color="inherit" href="/about">About</Button>
          { userDetails.token 
            ? <Button color="inherit" onClick={()=>logout(dispatch)}>Logout</Button>
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