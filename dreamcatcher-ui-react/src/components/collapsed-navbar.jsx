import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Box, AppBar, Toolbar, Button, Typography, IconButton } from "@material-ui/core";
import logo from '../assets/logo.png'
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from '@material-ui/icons/Menu';
import { useAuthDispatch, useAuthState } from '../context/context';
import { logout } from '../context/actions'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // position: "absolute",
        // right: 0
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
    },
    paper: {
        width: 100,
        alignItems: 'end'
    },
    logo: {
        // height: theme.spacing(5),
        height: '5vh',
        marginTop: theme.spacing(0.5)
    },
}));

export default function CollapsedNavbar(props) {
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();
    const isLoggedIn = userDetails.token ? true : false


    const handleLogout = () => {
        //setTokenStatus('');
        logout(dispatch);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} className={classes.drawer}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" href="/">
                            <img src={logo} alt="Logo" className={classes.logo} />
                        </Button>
                    </Typography>
                    <IconButton onClick={() => { setOpenDrawer(!openDrawer) }} style={{ marginLeft: 'auto' }}>
                        <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                    <Drawer anchor={'right'} classes={{paper: classes.paper}}
                     open={openDrawer} onClose={() => { setOpenDrawer(!openDrawer) }} >
                        {!isLoggedIn && <Button color="inherit" href="/">Home</Button>}
                        {isLoggedIn && <>
                            <Button color="inherit" href="/dashboard">Dashboard</Button>
                            <Button color="inherit" href="/profile">Profile</Button>
                            <Button color="inherit" href="/positions">Positions</Button>
                            <Button color="inherit" href="/forums">Forums</Button>
                        </>}
                        <Button color="inherit" href="/about">About</Button>
                        {isLoggedIn
                            ? <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            : null
                        }
                    </Drawer>
                </Toolbar>
            </AppBar>
        </div>
    );
}