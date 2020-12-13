import React, {Component} from 'react';
import Table from '../components/table';
import { AuthStateContext } from '../context/context';
import CircularProgress from '@material-ui/core/CircularProgress';

class MLApplicationsPage extends Component {
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
    const response = await fetch('/applications?token='+this.context.token+'&position=Machine Learning');
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
          <div className="applications" align ="center">
            <br></br>
            <Table numRows = "10" title = "Machine Learning Applications" data = {this.state.data.data}/>
            <br></br>
          </div>
  
      )
      }
    }
  }
  
  export default MLApplicationsPage