import CompanyList from './components/company-list';
import CompanyDetails from './components/company-details';
import BusinessList from './components/business-list';
import ChartWrapper from './components/chart-wrapper';

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class  App extends Component {

    state = {
        companys: [],
        selectedCompany: null,
        graphsData: [],
        graphsData0: []
    }

    componentDidMount() {
        //fetch data
        fetch('http://127.0.0.1:8000/api/companys/', {
            method: 'GET',
            headers: {
                'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
            }
        }).then(resp => resp.json())
            .then(res => this.setState({ companys: res }))
            .catch(error => console.log(error))


        fetch(`http://127.0.0.1:8000/api/companys/2360/get_bus_list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
            }
        }).then(resp => resp.json())
            .then(res => this.setState({ graphsData: res.result }))
            .catch(error => console.log(error))

        fetch(`http://127.0.0.1:8000/api/companys/1826/get_bus_list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
            }
        }).then(resp => resp.json())
            .then(res => this.setState({ graphsData0: res.result }))
            .catch(error => console.log(error))

        
    }

  loadCompany = company => {
    this.setState({selectedCompany: company});


  }
    /*<div className="layout">
                <CompanyList companys={this.state.companys} companyClicked={this.loadCompany} />
                <CompanyDetails company={this.state.selectedCompany} updateCompany={this.loadCompany}  />

        </div> */

  render() {
      console.log("app");
      console.log(this.state.graphsData0);
    return (
        <div className="App">
            {(this.state.graphsData0[0]) ? 
                <ChartWrapper data={this.state.graphsData} moreData={this.state.graphsData0}/>
                :  <h1>Company Rater</h1>
            } 
        
      </div>
    );
  }

}

export default App;
