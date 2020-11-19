import React, {Component, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import PostsTable from '../components/posts-table';

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
        <Grid container align="center">
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(1)} >
              <CardContent>
                <Typography variant="h4">
                  Topic 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(2)}>
              <CardContent>
                <Typography variant="h4">
                  Topic 2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(3)}>
              <CardContent>
                <Typography variant="h4">
                  Topic 3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.forumCard} onClick={()=>setForumNum(4)}>
              <CardContent>
                <Typography variant="h4">
                  Topic 4
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