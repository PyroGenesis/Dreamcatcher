import React, {Component} from 'react';
import Table from '../components/table'

class SoftwareApplicationsPage extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.callApi()
      .then(data => this.setState({ data}))
      .catch(err => console.log(err));
      
  }
  
  callApi = async () => {
    const response = await fetch('http://localhost:5000/applications?position=Software Engineer');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Software Engineer Applications"  data = {this.state.data}/>
            <br></br>
          </div>
  
      )
    }
  }
  
  export default SoftwareApplicationsPage