import React, {Component} from 'react';
import video from '../videos/ad.mp4';
import { Card, CardContent, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import user from '../images/user.JPG';

class AboutPage extends Component {

    render() {
        return ( 
            <div>
                <br></br>
                <Grid container align="center">
                    <Grid item xs={12}>
                        <video width="40%" controls>
                            <source src={video} type="video/mp4"></source>
                            Your browser does not support HTML video.
                        </video>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container align="center" spacing={5}>
                    <Grid item xs={4}>
                        <Card  style={{margin: '20px', minHeight: '125px'}}>
                        <Avatar alt="Remy Sharp" src={user} style = {{width:'50%', height:'50%'}} />
                        <CardContent>
                            <Typography variant="h4">
                                Anand Abhay Deshpande
                            </Typography>
                            <Typography variant="h5">
                                Full Stack Engineer
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card style={{margin: '20px', minHeight: '125px'}} >
                        <Avatar alt="Remy Sharp" src={user} style = {{width:'50%', height:'50%'}} />
                        <CardContent>
                            <Typography variant="h4">
                                Burhanuddin Lakdawala
                            </Typography>
                            <Typography variant="h5">
                                Backend Engineer & DBA
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card style={{margin: '20px', minHeight: '125px'}} >
                        <Avatar alt="Remy Sharp" src={user} style = {{width:'50%', height:'50%'}} />
                        <CardContent>
                            <Typography variant="h4">
                                Yash Uday Kulkarni
                            </Typography>
                            <Typography variant="h5">
                                Front End and Infrastructure Developer
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AboutPage