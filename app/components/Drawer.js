import React, { Component } from 'react';
import { Button, Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

import LoginScreen from '../components/LoginScreen';
import ProfileScreen from '../components/ProfileScreen';
import TimelineScreen from '../components/HomeTimeLine';
import NavBarItem from '../components/NavBarItem';
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from './utils/navigation';

const getDrawerItem = navigation => (
  <NavBarItem
    iconName="bars"
    onPress={() => {
      if (navigation.state.index === 0) {
        // check if drawer is not open, then only open it
        navigation.navigate('DrawerOpen');
      } else {
        // else close the drawer
        navigation.navigate('DrawerClose');
      }
    }}
  />
);

const getDrawerIcon = (iconName, tintColor) => <Icon name={iconName} size={20} color={tintColor} />;
const loginDrawerIcon = ({ tintColor }) => <MaterialIcons name="drafts" size={24} style={{ color: tintColor }}/>
const profileDrawerIcon = ({ tintColor }) => <MaterialIcons name="settings" size={24} style={{ color: tintColor }}/>
const timeLineDrawerIcon = ({ tintColor }) => <MaterialIcons name="drafts" size={24} style={{ color: tintColor }}/>

const loginNavOptions = getDrawerNavigationOptions('Login', 'brown', 'white', loginDrawerIcon);
const profileNavOptions = getDrawerNavigationOptions('Profile', 'brown', 'white', profileDrawerIcon);
const timeLineNavOptions = getDrawerNavigationOptions('TimeLine', 'brown', 'white', timeLineDrawerIcon);

const Drawer = DrawerNavigator({
  Login: { screen: LoginScreen, navigationOptions: loginNavOptions },
  YourProfile: { screen: ProfileScreen, navigationOptions: profileNavOptions },
  HomeTimeLine: { screen: TimelineScreen, navigationOptions: timeLineNavOptions },
},
{
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
}, getDrawerConfig(300, 'left'));

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Twitter', 'brown', 'white', getDrawerItem(navigation));

export default Drawer;