import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

const LoginStatusMessage = ({ isLoggedIn, dispatch }) => {
  if (!isLoggedIn) {
    return <Text>Please log in</Text>;
  }
  return (
    <View>
      {/*<Text style={styles.welcome}>{'You are "logged in" right now'}</Text>
      <Button
        onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))}
        title="Drawer"
      />*/}
    </View>
  );
};

// Define propTypes, optional
LoginStatusMessage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  haha: state.auth.baobao
});

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(mapStateToProps)(LoginStatusMessage);