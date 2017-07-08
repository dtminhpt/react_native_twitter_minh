/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

 import { Provider } from 'react-redux';
 import { createStore } from 'redux';

 import AppReducer from './app/reducers';
 import AppWithNavigationState from './app/navigators/AppNavigator';
 
 class App extends Component {
   store = createStore(AppReducer);

   render() {
     return(
       <Provider store={this.store}>
         <AppWithNavigationState/>
       </Provider>
     )
   }
 }

AppRegistry.registerComponent('Assign3', () => App);

