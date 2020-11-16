import SearchBar from "material-ui-search-bar";
import React, {Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Box } from "@material-ui/core";
import positions from "./page-positions-data";

import '../index.scss'

class PositionsPage extends Component {

  state = {
    searchValue: '',
    position: "default",
  }

  handleSearch = e => {
    console.log(e);
  }

  render() {
    return (
      <div className="applications" align ="center">
          <Grid container style={{margin: 0, width: '100vw'}} spacing={3}>
            <Grid item xs={12}>
              <SearchBar
                value={this.state.value}
                onChange={(newValue) => this.setState({ searchValue: newValue })}
                onRequestSearch={() => this.handleSearch(this.state)}
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
                    {positions.map((position) => (
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
                    this.state.position.companyName == null ? 
                      <div>
                        <h3> {positions[0].positionName} </h3>
                        <p style={{color: "grey"}}> {positions[0].companyName} </p>
                        <p style={{textAlign: "justify", whiteSpace: "pre-line"}}>
                          {positions[0].desc}
                        </p>
                        <a href={positions[0].link}> Link to application </a>
                      </div> : 
                      <div>
                        <h3> {this.state.position.positionName} </h3>
                        <p style={{color: "grey"}}> {this.state.position.companyName} </p>
                        <p style={{textAlign: "justify", whiteSpace: "pre-line"}}>
                          {this.state.position.desc}
                        </p>
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

export default PositionsPage