import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import HomeScreen from '../components/HomeScreen';
import DrawerExample from '../components/Drawer';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Home: {screen: HomeScreen}, 
  Drawer: { screen: DrawerExample}
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

/**
 * Provide store properties to the component.
 */
const mapStateToProps = state => ({
  nav: state.nav,
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps)(AppWithNavigationState);
