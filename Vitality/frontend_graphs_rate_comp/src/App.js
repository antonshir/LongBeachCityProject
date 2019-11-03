import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CompanyList from './components/company-list';
import CompanyDetails from './components/company-details';

class  App extends Component {

  state = {
      companys: [],
      selectedCompany: null
  }

  componentDidMount() {
    //fetch data
    fetch('http://127.0.0.1:8000/api/companys/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ad40f2637372be950afb452b5ae14fed8fd50e94'
      }
    }).then( resp => resp.json())
    .then( res => this.setState({companys: res}))
    .catch( error => console.log(error))
  }

  loadCompany = company => {
    this.setState({selectedCompany: company});
  }

  render() {
    return (
      <div className="App">
        <h1>Company Rater</h1>
        <div className="layout">
        <CompanyList companys={this.state.companys} companyClicked={this.loadCompany}/>
        <CompanyDetails company={this.state.selectedCompany} updateCompany={this.loadCompany}/>
        </div>
      </div>
    );
  }

}

export default App;
