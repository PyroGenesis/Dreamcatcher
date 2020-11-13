import React, {Component} from 'react';
import Table from '../components/table'

class SoftwareApplicationsPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Software Engineer Applications" />
            <br></br>
          </div>
  
      )
    }
  }
  
  export default SoftwareApplicationsPage