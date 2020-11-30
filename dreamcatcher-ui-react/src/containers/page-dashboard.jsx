import React, {Component} from 'react';
import Layout from '../components/layout'
import { AuthStateContext } from '../context/context';

class DashboardPage extends Component {
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
    const response = await fetch('/applications?token='+this.context.token);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    return (
      <div className="body-content dashboard">
        <br></br>
        <Layout tableData = {this.state.data}/>
      </div>

    )
  }
}

export default DashboardPage