import React, {Component} from 'react';
import Table from '../components/table'

import Card from '../components/cards'
import Layout from '../components/layout'

class DashboardPage extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.callApi()
      .then(data => this.setState({ data}))
      .catch(err => console.log(err));
      
  }
  
  callApi = async () => {
    const response = await fetch('http://localhost:8080/applications');
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