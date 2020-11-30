import React, {Component} from 'react';
import Table from '../components/table';
import { AuthStateContext } from '../context/context';

class PastApplicationsPage extends Component {
  static contextType = AuthStateContext;
  state = {
    data: [],
  };
  componentDidMount() {
    this.callApi()
      .then(data => this.setState({ data}))
      .catch(err => console.log(err));
      
  }
  
  callApi = async () => {
    const response = await fetch('http://localhost:5000/applications?token='+this.context.token);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
    render() {
      return (
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Past Applications" data = {this.state.data.data}/>
            <br></br>
          </div>
  
      )
    }
  }
  
  export default PastApplicationsPage