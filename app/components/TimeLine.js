/**
 * Created by ken on 4/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {Drawer} from 'native-base';
import {getHeaders} from 'react-native-simple-auth/lib/utils/oauth1';
import {TwitterConfig} from '../constants/config';
//import Actions from '../redux/action';
import SideBar from './side_menu';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import moment from 'moment';

const ic_verified = require('../resources/ic_verified.png');
const ic_favorited = require('../resources/ic_favorited.png');
const ic_unfavorite = require('../resources/ic_unfavorite.png');
const anim_favorite = require('../resources/anim_favorite.gif');
const ic_retweet = require('../resources/ic_retweet.png');
const ic_unretweet = require('../resources/ic_unretweet.png');


class Timeline extends Component {
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            refreshing: false,
            ds,
            drawerOpen: false,
        }
    }

    componentWillMount() {
        this.props.fetchTimeLine()
    }

    renderRow = (feed) => {
        if (!feed) {
            return <View/>
        }
        return (
            <FeedCell feed={feed}/>
        )
    }

    static toggleDrawer = () => {
        if (this.state.drawerOpen) {
            this._drawer.close();
        } else {
            this._drawer.open();
        }
    }

    static navigationOptions = {
        header: (prop) => ({
            title: 'Home',
        }),
    }

    render() {
        let feeds = this.props.feeds;
        if (!feeds) {
            feeds = []
        }
        const dataSource = this.state.ds.cloneWithRows(feeds);
        return (
            <Drawer
                type="overlay"
                content={<SideBar/>}
                tapToClose={true}
                ref={(ref) => this._drawer = ref}
                openDrawerOffset={0.4}
                panCloseMask={0.4}
                panOpenMask={0.2}
                onOpenStart={()=> this.setState({drawerOpen: true})}
                onCloseStart={()=> this.setState({drawerOpen: false})}
            >
                <ListView
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={this.renderFeed}
                />
            </Drawer>
        )
    }

    renderFeed = (feed) => {
        if (!feed) {
            return <View/>
        }

        let favIcon = feed.favorited ? ic_favorited : ic_unfavorite;
        let retweetIcon = feed.retweeted ? ic_retweet : ic_unretweet;

        return (
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    onPress={() => this.userDetail(feed.user)}
                >
                    <Image
                        source={{uri: feed.user.profile_image_url_https}}
                        style={styles.avatar}
                        indicator={ProgressBar}
                    />
                </TouchableOpacity>

                <View>

                    <View
                        style={styles.row}
                    >
                        <Text style={styles.name}>{feed.user.name}</Text>
                        {feed.user.verified ?
                            <Image
                                style={styles.icon}
                                source={ic_verified}
                            /> : null}
                    </View>
                    <Text style={styles.screen_name}>@{feed.user.screen_name}</Text>

                    <Text
                        style={styles.screen_name}>{moment(feed.created_at, "ddd MMM DD HH:mm:ss Z YYYY").fromNow()}</Text>
                    <Text> {feed.text}</Text>
                    <View
                        style={styles.row}
                    >
                        <TouchableOpacity
                            onPress={this.retweedFeed}
                        >
                            <Image
                                style={styles.icon}
                                source={retweetIcon}
                            />
                        </TouchableOpacity>
                        <Text>{feed.retweet_count}</Text>

                        <TouchableOpacity
                            onPress={this.favoriteFeed}
                        >
                            <Image
                                style={styles.icon}
                                source={favIcon}
                            />
                        </TouchableOpacity>
                        <Text>{feed.favorite_count}</Text>
                    </View>
                </View>
            </View>
        )
    }

    userDetail = (user) => {
        debugger
        this.props.navigation.navigate('Profile')
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
        padding: 4,
        flexDirection: 'row',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    avatar: {
        marginTop: 4,
        marginRight: 8,
        width: 45,
        height: 45,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    screen_name: {
        fontSize: 12,
        color: "#748290",
    },

    icon: {
        width: 30,
        height: 30,
    },


})

const mapStateToProps = state => ({...state})

const mapDispatchToProps = dispatch => ({dispatch})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    async fetchTimeLine () {
        const httpMethod = 'GET';
        const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        const headers = getHeaders(url, {}, {}, TwitterConfig.appId, TwitterConfig.appSecret, httpMethod, stateProps.credentials.oauth_token, stateProps.credentials.oauth_token_secret);

        const response = await fetch(url, {
            method: httpMethod,
            headers,
        });
        const json = await response.json();
        dispatchProps.dispatch(Actions.updateHomeTimeline(json))
        console.log('user_timeline', JSON.stringify(json[0]));
    },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Timeline)