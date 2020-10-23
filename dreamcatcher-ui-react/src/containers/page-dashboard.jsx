import React, {Component} from 'react';
import Table from './table'
import Button from '@material-ui/core/Button';

class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="applications" align ="center">
          <Table numRows = "5"/>
          <br></br>
          <Button variant="contained" color="primary" href="past-applications">
            VIEW ALL
          </Button>
        </div>
      </div>

    )
  }
}

export default DashboardPage