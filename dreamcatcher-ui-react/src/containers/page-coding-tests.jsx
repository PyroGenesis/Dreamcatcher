import React, {Component} from 'react';
import Table from '../components/table'

class CodingTestsPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Coding Tests" />
            <br></br>
          </div>
  
      )
    }
  }
  
  export default CodingTestsPage