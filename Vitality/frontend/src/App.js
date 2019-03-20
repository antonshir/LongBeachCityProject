import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';


import Dashboard from './containers/Dashboard';
import BusinessList from "./containers/BusinessListView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard>
            <BusinessList>

            </BusinessList>
        </Dashboard>

      </div>
    );
  }
}

export default App;
