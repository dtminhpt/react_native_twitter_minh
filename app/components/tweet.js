import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ListView,
    Stylesheet,
    Linking,
    TextInput,
    Navigation,
    RefreshControl, Button
} from 'react-native';

import twitter, {auth} from 'react-native-twitter';
import HomeScreen from './HomeScreen.js'
import {twitterAPI} from '../api/twitterapi.js'

export default class TweetScreen extends Component {
    static navigationOptions =  ({navigation}) => {
        const { createTweet } = navigation.state.params || {}
        return {
            title: 'Tweet Screen',
            headerRight: <Button title="Tweet" onPress={createTweet}/>,
        }
    }

    componentDidMount() {
        let { navigation } = this.props
        navigation.setParams({
            createTweet: () => this.createTweet()
        })
    }

    constructor(props) {
        super(props);
        this.state ={
            count:0,
            text:''
        }
    }

    countLetters(value) {
        this.setState({count:value.length, text:value});
    }

    async createTweet(){
         alert("createTweet")
         let data = await twitterAPI.createTweet(this.state.text).then((item) => {
            console.log(item);
            this.props.navigation.navigate('Home')
        })
    }

    backToHomeScreen(){
        this.props.navigation.navigate('Home')
    }

    render(){
        return (
             <View
                style={{
                    paddingTop: 25,
                    backgroundColor: '#4890A8'
                }}>
                <StatusBar barStyle='dark-content'/>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 6,
                    marginRight: 6,
                    marginBottom:5
                    }}>
                    
                </View>
                <View style={{paddingTop: 25,backgroundColor: 'white'}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',}}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: 'black'
                            }}>minhdinh
                        </Text>
                        <Text
                            style={{
                                fontSize: 17,
                                color: 'silver',
                            }}>{this.state.count}
                        </Text>
                    </View>
                        <View style={{backgroundColor:'white', width:'100%',height:'95%'}}>
                        <TextInput onChangeText={(value) => this.countLetters(value) } editable={true} multiline={true} numberOfLines={40}
                        style={{margin:10, fontSize:17, height:'70%', paddingBottom:0, borderWidth: 1}} />
                    </View>
                    </View>
            </View>
        )
    }

}