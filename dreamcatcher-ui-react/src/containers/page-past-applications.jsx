import React, {Component} from 'react';
import Table from '../components/table';
import { AuthStateContext } from '../context/context';
import CircularProgress from '@material-ui/core/CircularProgress';

class PastApplicationsPage extends Component {
  static contextType = AuthStateContext;
  state = {
    data: [],
    isLoading: true,
  };
  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ data:response}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/applications?token='+this.context.token);
    const body = await response.json();
    this.setState({ isLoading:false});
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
    render() {
      
      if(this.state.isLoading) {
        return (
          <div className="body-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size="10vw" />
          </div>
        );
      }
      else{
      return (
          <div className="body-content applications" align ="center" style={{paddingTop: 20, paddingBottom: 20}}>
            <Table numRows = "10" title = "Past Applications" data = {this.state.data.data}/>
          </div>
  
      )
    }
    }
  }
  
  export default PastApplicationsPage