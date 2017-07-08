import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Stylesheet,
    Navigation,
    ScrollView,
    RefreshControl, 
    Button
} from 'react-native';

import { connect } from 'react-redux';
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import DrawerExample from './Drawer'

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home Screen',
        headerRight: <AuthButton />,
    }
    render() {
        return(
            <View>
                <View>
                    <LoginStatusMessage/>

                    {/*<AuthButton/>*/}
                </View>
                

                <Text>Home Page</Text>
                {/*<Button
                    onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))}
                    title="Drawer"
                />*/}
            </View>
        )
    }
}

const mapStatetoProps = state => ({
    haha: state.auth.baobao, 
    mynamehere: state.auth.username
});

export default connect(mapStatetoProps)(HomeScreen);