import React, {Component} from 'react';
import Table from '../components/table'

class InterviewPage extends Component {
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Interviews"/>
            <br></br>
          </div>
  
      )
    }
  }
  
  export default InterviewPage