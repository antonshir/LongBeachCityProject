/**
 * CityPulse Cross-Platform app
 * CSULB team 
 * Fall 2019
 * Andre Barajas
 * Ernest Arreola
 * Anton Shirokov 
 * Sovathana Hend 
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BusinessNavigator from './navigation/BusinessNavigator';
import businessesReducer from './store/business-reducer';


const rootReducer = combineReducers({
    businesses: businessesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

export default function App() {
    return (
        <Provider store={store}> 
            <BusinessNavigator />
        </Provider>     
        );
  }
    
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
