import SearchBar from "material-ui-search-bar";
import React, {Component, useEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Box } from "@material-ui/core";
import positions from "./page-positions-data";
import {firestore} from "../components/firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import '../index.scss'



class PositionsPage extends Component {

  state = {
    searchValue: '',
    position: {},
    positions: [],
    defaultPositions: [],
    loading: true
  }

  async componentDidMount() {
    const positionsReference = firestore.collection('positions');

    const searchKey = "software"

    const data = await positionsReference.where("position_name_array", "array-contains-any", [searchKey]).get();
    
    if (data.empty) {
      alert("Error retrieving positions");
      return;
    }  
    
    let positions = []

    data.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      positions.push({
        positionName: doc.data().position_name,
        companyName: doc.data().company_name,
        desc: doc.data().description,
        link: doc.data().link
      })
    });

    this.setState({positions: positions});
    this.setState({defaultPositions: positions});
    this.setState({loading: false})
    this.setState({position: positions[0]})
  }

  handleSearch = async(e) => {

    let searchKey = e.searchValue.toLowerCase().replace(/[^a-zA-Z ]/g, "").split(" ")

    const positionsReference = firestore.collection('positions');

    const data = await positionsReference.where("position_name_array", "array-contains-any", searchKey).get();
    
    if (data.empty) {
      alert('No matching positions found.');
      return;
    }  
    
    let positions = []

    data.forEach(doc => {
      positions.push({
        positionName: doc.data().position_name,
        companyName: doc.data().company_name,
        desc: doc.data().description,
        link: doc.data().link
      })
    });

    this.setState({positions: positions});
  }

  handleCancelSearch = e => {
    this.setState({positions: e.defaultPositions})
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="20vw" />
        </div>
      )
    }
    else {
      return (
        <div className="applications" align ="center">
            <Grid container style={{margin: 0, width: '100vw'}} spacing={3}>
              <Grid item xs={12}>
                <SearchBar
                  value={this.state.searchValue}
                  onChange={(newValue) => this.setState({ searchValue: newValue })}
                  onRequestSearch={() => this.handleSearch(this.state)}
                  onCancelSearch={() => this.handleCancelSearch(this.state)}
                  placeholder="Search positions..."
                  style={{
                    margin: '10px'
                  }}
                />
              </Grid>
              <Grid item xs={4} align="left" style={{height: "75vh", overflow: 'auto',  alignItems: "center"}}>
                <TableContainer style={{marginLeft: "10px"}}>
                  <Table>
                    <TableBody>
                      {this.state.positions.map((position) => (
                        <TableRow key={position.companyName}>
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
              <Grid item xs={8} align="left" style={{height: "75vh", overflow: 'auto'}}>
                <Card style={{marginRight: "10px"}}>
                  <CardContent>
                    {
                        <div>
                          <h3> {this.state.position.positionName} </h3>
                          <p style={{color: "grey"}}> {this.state.position.companyName} </p>
                          {/* <p style={{textAlign: "justify", whiteSpace: "pre-line"}}>
                            {this.state.position.desc}
                          </p> */}
                          <Typography variant="body1" align="justify" style={{whiteSpace: 'pre-line'}}>
                              {this.state.position.desc}
                          </Typography>
                          <br/>
                          <a href={this.state.position.link}> Link to application </a>
                        </div>
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
        </div>
      )
    }
  }
}

export default PositionsPage