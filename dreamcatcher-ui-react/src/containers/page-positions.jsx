import SearchBar from "material-ui-search-bar";
import React, {Component, useEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Box, Avatar, DialogContentText } from "@material-ui/core";
import positions from "./page-positions-data";
import {firestore} from "../components/firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AuthStateContext } from '../context/context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PositionsDialog from "../components/positions-dialog"
import firebase from 'firebase/app';
import "firebase/firestore";

import '../index.scss'
import ErrorDialog from "../components/error-dialog";
import SuccessDialog from "../components/success-dialog";

const myPromise = new Promise(function(resolve, reject) {
  
    const searchKey = "software"

    const db = firebase.firestore();
    // const query = db.collection('positions').where("position_name_array", "array-contains-any", [searchKey])

    const query = db.collection('positions')

    let defaultPositions = []

    const observer = query.onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {

        // const imgData = await (await fetch('/images', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ queries: [change.doc.data().company_name] })
        // })).json();

        fetch('/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queries: [change.doc.data().company_name.toLowerCase()] })
        }).then(res => {
          return res.json();
        }).then(imgData => {

          const position = {
            companyName: change.doc.data().company_name,
            desc: change.doc.data().description,
            link: change.doc.data().link,
            positionName: change.doc.data().position_name,
            image: imgData.data[change.doc.data().company_name.toLowerCase()],
            positionLevel: change.doc.data().position_level,
            positionDuration: change.doc.data().position_duration
          }
          
          defaultPositions.push(position)
        });
        
      })
    })
  
  if (defaultPositions) {
    resolve(defaultPositions)
  } else {
    reject('error')
  }
  
})

class PositionsPage extends Component {
  static contextType = AuthStateContext;
  state = {
    searchValue: '',
    position: {},
    positions: [],
    defaultPositions: [],
    loading: true,
    opacity: 0.0,
    dialog: false,
    errorDialog: false,
    errorMessage: '',
    successDialog: false,
    successMessage: ''
  }

  async componentDidMount() {
    const positionsReference = firestore.collection('positions');

    const searchKey = "software"

    // const data = await positionsReference.where("position_name_array", "array-contains-any", [searchKey]).get();

    const data = await positionsReference.get();
    
    // if (data.emty) {
    if (data.empty) {
      // alert("Error retrieving positions");
      this.setState({ errorDialog: true })
      this.setState({ errorMessage: 'Error retrieving positions. Please refresh page and check again. '})
    }  
    
    const imgQ = data.docs.map(d => d.data().company_name.toLowerCase());

    const imgData = await (await fetch('/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries: imgQ })
    })).json();

    let positions = []

    data.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      positions.push({
        id: doc.id,
        positionName: doc.data().position_name,
        companyName: doc.data().company_name,
        desc: doc.data().description,
        link: doc.data().link,
        image: imgData.data[doc.data().company_name.toLowerCase()],
        positionLevel: doc.data().position_level,
        positionDuration: doc.data().position_duration
      })
    });

    this.setState({positions: positions});
    this.setState({defaultPositions: positions});
    this.setState({loading: false})
    this.setState({position: positions[0]})
  }

  handleSearch = async(e) => {

    if(e.searchValue.length < 1) {
      this.setState({loading: false})
      return;
    }

    let searchKey = e.searchValue.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ")

    const positionsReference = firestore.collection('positions');

    const data = await positionsReference.where("position_name_array", "array-contains-any", searchKey).get();
    
    if (data.empty) {
      // alert('No matching positions found.');
      // return;
      this.setState({ searchValue: '' })
      this.setState({ loading: false })
      this.setState({ errorDialog: true })
      this.setState({ errorMessage: 'No matching positions found '})
      return;
    }  
    
    const imgQ = data.docs.map(d => d.data().company_name.toLowerCase());

    const imgData = await (await fetch('/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries: imgQ })
    })).json();
    
    let positions = []

    data.forEach(doc => {
      positions.push({
        id: doc.id,
        positionName: doc.data().position_name,
        companyName: doc.data().company_name,
        desc: doc.data().description,
        link: doc.data().link,
        image: imgData.data[doc.data().company_name.toLowerCase()],
        positionLevel: doc.data().position_level,
        positionDuration: doc.data().position_duration
      })
    });

    this.setState({positions: positions});
    this.setState({position: positions[0]})
    // this.setState({ opacity: 0.0 })
    this.setState({ loading: false })
  }

  

  handleCancelSearch = async(e) => {
    // this.setState({opacity: 0.0})
    // const searchKey = "software"

    // const db = firebase.firestore();
    // const query = db.collection('positions').where("position_name_array", "array-contains-any", [searchKey])

    // let defaultPositions = []

    // const observer = query.onSnapshot(querySnapshot => {
    //   querySnapshot.docChanges().forEach(change => {
        
    //     const position = {
    //       companyName: change.doc.data().company_name,
    //       desc: change.doc.data().description,
    //       link: change.doc.data().link,
    //       positionName: change.doc.data().position_name
    //     }
        
    //     defaultPositions.push(position)
    //   })
    // })

    // this.setState({positions: defaultPositions})
    // // this.setState({position: defaultPositions[0]})

    // console.log(this.state.positions)

    // this.setState({ loading: false })

    myPromise.then((defaultPositions) => {
      // console.log(defaultPositions)
      this.setState({ loading: false })
      this.setState({positions: defaultPositions})
      this.setState({position: defaultPositions[0]})
    })

  }

  handleAddApplication = async(e) =>{
    const response = await fetch('/applications/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: this.context.token,
        id: e.position.id,
        status:"Applied"
      })
    });
    const body = await response.json();
    if (response.status == 200) {
      this.setState({
        errorDialog: true,
        errorMessage: body.message
      })
    }
    else if (response.status == 201) {
      this.setState({
        successDialog: true,
        successMessage: 'Successfully added application!'
      })
    }
    else {
      // throw Error(body.message);
      this.setState({
        errorDialog: true,
        errorMessage: body.message
      })
    }
  }

  addPosition = (e) => {
    this.setState({positions: [...this.state.positions, e]})
  }

  showDialog = (e) => {
    this.setState({ dialog: e });
  }

  render() {
    // if(this.state.loading) {
    //   return (
    //     <div className="applications" align ="center">
    //       <Grid container style={{margin: 0, width: '100vw'}} spacing={3}>
    //         <Grid item xs={12}>
    //           <SearchBar
    //             value={this.state.searchValue}
    //             onChange={(newValue) => {this.setState({ searchValue: newValue }); /*this.setState({opacity: 0.1})*/}}
    //             onRequestSearch={() => this.handleSearch(this.state)}
    //             onCancelSearch={() => this.handleCancelSearch(this.state)}
    //             placeholder="Search positions..."
    //             style={{
    //               margin: '10px'
    //             }}
    //           />
    //         </Grid>
    //       </Grid>
    //       <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //         <CircularProgress size="20vw" />
    //       </div>
    //     </div>
    //   )
    // }
    // else {
      return (
        <div className="applications" align ="center">
          <Grid container style={{margin: 0, width: '100vw'}} spacing={3}>
            <Grid container direction="row">
              <Grid item md={11} xs={10}>
                <SearchBar
                  value={this.state.searchValue}
                  onChange={(newValue) => {
                    if(!this.state.loading)
                      this.setState({loading: true}); 
                    this.setState({ searchValue: newValue })} 
                  }
                  onRequestSearch={() => this.handleSearch(this.state)}
                  onCancelSearch={() => this.handleCancelSearch(this.state)}
                  placeholder="Search positions..."
                  style={{
                    margin: '10px'
                  }}
                />
              </Grid>
              <Grid item md xs>    
                <Fab color="primary" aria-label="add" size="medium" style={{ marginTop: '10px' }} onClick={this.showDialog} >
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item xs={12}>
              {
                this.state.dialog ? <PositionsDialog dialog={this.state.dialog} setDialog={(e)=>this.showDialog(e)} addPosition={this.addPosition} searchValue={this.state.searchValue}/> : null
              } 
              {
                this.state.errorDialog ? <ErrorDialog dialog={this.state.errorDialog} setDialog={(e)=>this.setState({errorDialog: e})} value={this.state.errorMessage}/> : null
              }
              {
                this.state.successDialog ? <SuccessDialog dialog={this.state.successDialog} setDialog={(e)=>this.setState({successDialog: e})} value={this.state.successMessage}/> : null
              }
              </Grid>
            </Grid>
          </Grid>
          {
            this.state.loading ? 
              <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size="7vw" style={{marginTop: '30vh'}}/>
              </div> :
              <Grid container style={{margin: 0, width: '100vw'}} spacing={3}>
                <Grid item xs={4} align="left" style={{height: "75vh", overflow: 'auto',  alignItems: "center", background: `rgba(0, 0, 0, ${this.state.opacity})`}}>
                  <TableContainer style={{marginLeft: "10px"}}>
                    <Table>
                      <TableBody>
                        {this.state.positions.map((position) => (
                          <TableRow key={position.id}>
                            <TableCell>
                              <Avatar variant="square" src={position.image}>{position.companyName.charAt(0)}</Avatar>
                            </TableCell>
                            <TableCell onClick={()=>this.setState({ position: position })}>
                              <p style={{fontSize: "20px"}}> {position.positionName} </p> 
                              <p style={{color: "grey"}}> {position.companyName} </p>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={8} align="left" style={{height: "75vh", overflow: 'auto', background: `rgba(0, 0, 0, ${this.state.opacity})`}}>
                  <Card style={{marginRight: "10px", background: `rgba(0, 0, 0, ${this.state.opacity})`}}>
                    <CardContent>
                      {
                          <div>
                            <h3> {this.state.position.positionName} </h3>
                            <p style={{color: "grey",display:"inline"}}> {this.state.position.companyName} </p>
                            <Button style={{float:"right"}} onClick = {()=>this.handleAddApplication(this.state)}>Add to My Applications</Button>
                            <br/><br/>
                            <Typography variant="subtitle2" style={{color: "grey"}}>
                                Position Level: {this.state.position.positionLevel} <br/>
                                Position Duration: {this.state.position.positionDuration}
                            </Typography>
                            <br/>
                            <a href={this.state.position.link} target="_blank" rel="noopener"> Link to application </a>
                            <br/><br/>
                            <Typography variant="body1" align="justify" style={{whiteSpace: 'pre-line'}}>
                                {this.state.position.desc}
                            </Typography>
                            <br/>
                          </div>
                      }
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
          }
        </div>
      )
    // }
  }
}

export default PositionsPage