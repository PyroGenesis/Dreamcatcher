import React, { Component } from 'react';
import video from '../videos/ad.mp4';
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import user from '../images/user.png';
import burhan from '../images/burhan.jpg';

const styles = theme => ({
    root: {
        backgroundColor: "red"
    }
});

class AboutPage extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }


    render() {
        const devs = [{
            name: 'Anand Abhay Deshpande',
            position: 'Full Stack Engineer',
            image: user
        }, {
            name: 'Burhanuddin M. Lakdawala',
            position: 'Backend Engineer and DBA',
            image: burhan
        }, {
            name: 'Yash Kulkarni',
            position: 'Full Stack Engineer',
            image: user
        }];

        const { theme, classes } = this.props;
        return (
            <div className="body-content">
                <Grid container direction="column" alignItems="center" spacing={1} style={{ height: '100%', width: '100%', padding: theme.spacing(1) }}>
                    <div style={{ height: '50%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <video height="100%" controls>
                            <source src={video} type="video/mp4"></source>
                            Your browser does not support HTML video.
                        </video>
                    </div>
                    <div className="row" style={{ height: '50%', width: '100%', paddingTop: 12}}>
                    {/* <Grid item style={{ height: '50%', width: '100%', display: 'flex' }}> */}
                        {devs.map(dev => (
                            <Card className="col-12 col-lg-4" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar alt="Remy Sharp" src={dev.image} style={{ height: 200, width: 200 }}>
                                    </Avatar>
                                </div>

                                <CardContent>
                                    <Typography align="center" variant="h5">
                                        {dev.name}
                                    </Typography>
                                    <Typography align="center" variant="h6">
                                        {dev.position}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    {/* </Grid> */}
                    </div>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(AboutPage);