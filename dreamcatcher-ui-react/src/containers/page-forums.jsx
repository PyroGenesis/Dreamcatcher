import React, {Component, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import PostsTable from '../components/posts-table';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  small: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  subtitle: {
    color: grey[500],
    marginLeft: theme.spacing(1.5)
  },
  title: {
    marginLeft: theme.spacing(1.5)
  },
  forumCard: {
    margin: '20px', minHeight: '125px', display: "flex", flexDirection: "column", justifyContent: "center"
  }
}));

function ForumsPage(props) {
    const classes = useStyles();

    const [forumNum, setForumNum] = useState(1);

    return (
      <div className="body-content forums">
        {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
        <Grid container align="center">
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(1)} >
              <CardContent>
                <Typography variant="h4">
                  Interview Experiences
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(2)}>
              <CardContent>
                <Typography variant="h4">
                  Offer<br/>Discussion
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(3)}>
              <CardContent>
                <Typography variant="h4">
                  Technical<br/>Questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(4)}>
              <CardContent>
                <Typography variant="h4">
                  General<br/>Discussion
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '20px', marginRight: '20px'}}>
            <PostsTable forumNum={forumNum}/>
          </Grid>
        </Grid>
      </div>
    )
}

export default withRouter(ForumsPage);