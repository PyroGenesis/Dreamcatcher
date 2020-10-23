import React, {Component} from 'react';
import Table from '../components/table'

class PastApplicationsPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" />
            <br></br>
          </div>
  
      )
    }
  }
  
  export default PastApplicationsPage