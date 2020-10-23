import React, {Component} from 'react';
import Table from '../components/table'

import Card from '../components/cards'
import Layout from '../components/layout'

class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Layout/>
      </div>

    )
  }
}

export default DashboardPage