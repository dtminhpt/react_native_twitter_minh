import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Button, 
  Linking
} from 'react-native';

import { twitter } from 'react-native-simple-auth';
export default class LoginScreen extends Component{
    static navigationOptions = {
        title: 'Login'
    }

    _loginTwitter() {
        this.props.navigation.dispatch({type: 'Login', baobao: "minh"})
        twitter({
            appId: 'LGEvzx2CFjplU2TaFDHjb7s0b',
            appSecret: 'NMP2yFRoWviPKEC8UgMlBszj0RrAp1cx0v2z3ytaVGPm1Qc6yi',
            callback: 'com.minhquan://authorize',
            }).then((info) => {
            // info.user - user details from the provider
            // info.credentials - tokens from the provider
            console.log(info)
            alert(JSON.stringify(info))
        }).catch((error) => {
            alert(JSON.stringify(error))
            console.log(error)
            // error.code
            // error.description
            });
    }
    render() {
        return(
            <View style={styles.container}>
                <Button 
                    title="Login Twitter"
                    onPress={() => this._loginTwitter()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

