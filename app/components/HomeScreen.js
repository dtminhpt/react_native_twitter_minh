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
    Button, 
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import DrawerExample from './Drawer'
//import LoginScreen from './LoginScreen.js'
import {twitterAPI} from '../api/twitterapi.js'

import {getHeaders} from 'react-native-simple-auth/lib/utils/oauth1';
import Hyperlink from 'react-native-hyperlink'
import Lightbox from 'react-native-lightbox'
import Video from 'react-native-video'

import TweetScreen from './tweet.js'
import RetweetIcon from './retweet.js'
import ReplyIcon from './reply.js'
import HeartIcon from './heart.js'

import NavBarItem from '../components/NavBarItem';


class HomeScreen extends Component {
    static navigationOptions =  ({navigation}) => {
        const { goToTweetScreen } = navigation.state.params || {}
        return {
            title: 'Home Screen',
            headerRight: <Button title="New" onPress={goToTweetScreen}/>,
            headerLeft: <AuthButton />,
        }
    }

    componentDidMount() {
        let { navigation } = this.props
        navigation.setParams({
            goToTweetScreen: () => this.goToTweetScreen()
        })
    }

    constructor(props) {
        super(props);
        this.renderTweetCell = this
            .renderTweetCell
            .bind(this);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            timelineData: [{}],
            dataSource: this
                .ds
                .cloneWithRows([]),
            isRefreshing: false,
            drawerEnable:false,
        }
    }

    onRefeshListView() {
        this.setState({
            isRefreshing: true
        });
        this.getHomeTimeline();
    }

    componentWillMount() {
        this.getHomeTimeline();
    }

    async updateStatus(){
        alert("Update status")
    }

    goToTweetScreen(){
        this.props.navigation.navigate('Tweet')
    }

    async getHomeTimeline(params = {}) {
        const json = await twitterAPI.getHomeTimeLine().then((item) =>{
            //console.log(item);
            return item;
        }).done((item) => {
            
        this.setState({
            timelineData: item,
            dataSource: this
                .state
                .dataSource
                .cloneWithRows(item)
        })
        })
    }

    prettyDate = (time) => {
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
            
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;
            
     return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

    renderTweetCell(rowData, sectionID, rowID) {
        console.log("renderTweetCellrenderTweetCellrenderTweetCellrenderTweetCellrenderTweetCell");
        if (!rowData.user)
        {
            return(<View></View>)
        }

        let entities = '';
        let media = (<Text/>);
        if (rowData.extended_entities != null) {
            if ( rowData.extended_entities.media[0].type === 'photo'){

            entities = rowData.extended_entities.media[0].media_url_https;
            let width = rowData.extended_entities.media[0].sizes.small.w/2;
            let height = rowData.extended_entities.media[0].sizes.small.h/2;
 
            media = (
                <Lightbox renderContent={() => {
                    return ( <View style={{margin: 10}}><Image resizeMode='contain' source={{uri :entities}} style={{width:'100%', height:'100%'}}/></View>)
                }}>
                <Image resizeMode='cover' source={{uri :entities}} style={{marginTop: 15,width:width-50,height:height-50, borderRadius:4}}/>
                </Lightbox>)
       
            } else if ( rowData.extended_entities.media[0].type == 'animated_gif'){
                 entities = rowData.extended_entities.media[0].video_info.variants[0].url;
                 let width = rowData.extended_entities.media[0].sizes.small.w-100;
                let height = rowData.extended_entities.media[0].sizes.small.h-100;
                 media = (<Video repeat resizeMode='cover'
                source={{uri:entities}}
                style={{marginTop: 15,width:width, height:height, borderRadius:4}}
                 
            />)
            } }
        return (
              <TouchableOpacity>
                <View style={{flexDirection:'row', padding:5, borderBottomColor:'gray',borderBottomWidth:1}}>
                    <View style={{flex:1.5}}>
                        <Image style={{width:50,height:50, borderRadius:4}} source={{ uri:rowData.user.profile_image_url_https}}/>
                    </View>
                    <View style={{flex:8.5}}>
                    <Text>
                    <Text style={{fontWeight:'bold'}}>{rowData.user.name}</Text> <Text style={{color:'gray'}}>@{rowData.user.screen_name} {this.prettyDate(rowData.created_at)}</Text>
                    </Text>
                    <Hyperlink linkStyle={{color:'#2980b9'}} 
                                onPress={url => Linking.openURL(url).catch(error => alert('Please check your connection again'))}>
                        <Text>{rowData.text}</Text>
                    </Hyperlink>
                    {media}
                    <View style={{flexDirection:'row', paddingTop:10,paddingRight : 10, justifyContent:'space-between'}}>
                            <ReplyIcon replyCount={Math.abs(rowData.favorite_count - rowData.retweet_count)} handleReply={() => this.handleReply()}/>
                            <RetweetIcon retweetCount={rowData.retweet_count} handleRetweet={() => this.handleRetweet()}/>
                            <HeartIcon likeCount={rowData.favorite_count} 
                            handleLikeButton={() => {this.handleLikeButton(rowID)} }/>
                    </View>
                    
                    </View>
                </View>
              </TouchableOpacity>
        )
    }

    handleRetweet(){
        alert("Handle Retweet")
    }

    handleReply(){
        alert("Handle Reply")
    }

     handleLikeButton = async (rowID) =>{
         let data = this.state.timelineData;
         data[rowID].favorite_count = data[rowID].favorite_count + 1;
          this.setState({
            timelineData: data,
            dataSource: this
                .ds
                .cloneWithRows(data)
        })
        console.log(data[rowID]);
         let like = await twitterAPI.favoriteTweet(data[rowID].id_str).then((item) => {
            console.log(item);
         });
    }

    render() {
        return(
            <View>
                <View>
                    <LoginStatusMessage/>
                </View>
                <View style={{backgroundColor:'white', height:'94%',marginTop:10, paddingTop:5}}>
                    <ListView style={{flexDirection: 'column',height:'100%'}}
                    enableEmptySections={true}
                    refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefeshListView.bind(this)}/>} 
                            dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID) => this.renderTweetCell(rowData, sectionID, rowID)}/> 
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 0},
}

const mapStatetoProps = state => ({
    haha: state.auth.baobao, 
    mynamehere: state.auth.username
});

export default connect(mapStatetoProps)(HomeScreen);