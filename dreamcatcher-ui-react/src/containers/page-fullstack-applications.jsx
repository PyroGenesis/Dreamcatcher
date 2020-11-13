import React, {Component} from 'react';
import Table from '../components/table'

class FullStackApplicationsPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Full Stack Applications"/>
            <br></br>
          </div>
  
      )
    }
  }
  
  export default FullStackApplicationsPage