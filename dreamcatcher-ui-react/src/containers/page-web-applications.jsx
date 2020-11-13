import React, {Component} from 'react';
import Table from '../components/table'

class WebApplicationsPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Web Applications"/>
            <br></br>
          </div>
  
      )
    }
  }
  
  export default WebApplicationsPage