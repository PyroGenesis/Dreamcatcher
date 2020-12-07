import React, {Component} from 'react';
import Layout from '../components/layout'
import { AuthStateContext } from '../context/context';

class DashboardPage extends Component {
  render() {
    return (
      <div className="body-content dashboard">
        <br></br>
        <Layout/>
      </div>

    )
  }
}

export default DashboardPage