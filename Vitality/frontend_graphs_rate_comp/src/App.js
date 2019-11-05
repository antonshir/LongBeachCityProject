import CompanyList from './components/company-list';
import CompanyDetails from './components/company-details';
import BusinessList from './components/business-list';

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
        'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
      }
    }).then( resp => resp.json())
    .then( res => this.setState({companys: res}))
    .catch( error => console.log(error))
  }

  loadCompany = company => {
    this.setState({selectedCompany: company});


  }

  render() {
      console.log("app");
      console.log(this.state.companys);
    return (
      <div className="App">
        <h1>Company Rater</h1>
        <div className="layout">
                <CompanyList companys={this.state.companys} companyClicked={this.loadCompany} />
                <CompanyDetails company={this.state.selectedCompany} updateCompany={this.loadCompany}  />

        </div>
      </div>
    );
  }

}

export default App;
