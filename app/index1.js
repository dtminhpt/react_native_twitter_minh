import React, { Component } from 'react';
import { Button, Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyNavScreen = ({ navigation, banner }) => (
    <View>
        <Header title="Home"/>
        <ScrollView style={styles.container}>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
    </View>
);

const InboxScreen = ({ navigation }) => (
  <View>
        <Header title="Inbox"/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button onPress={() => navigation.navigate('DrawerOpen')}
                title="Open drawer 2"
            />
            <View>
                <Text>Inbox</Text>
            </View>
        </View>
    </View>
);
InboxScreen.navigationOptions = {
  drawerLabel: 'Inbox',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  ),
};

class Header extends Component {
    render() {
        const {title} = this.props;
        return(
            <View style={{margin:50}}>
                <Text>Header - {title}</Text>
            </View>
        )
    }
}

const SettingScreen = ({ navigation }) => (
    <View>
        <Header title="Settings"/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button onPress={() => navigation.navigate('DrawerOpen')}
                title="Open drawer 2"
            />
            <View>
                <Text>Settings</Text>
            </View>
        </View>
    </View>
);

SettingScreen.navigationOptions = {
    drawerLabel: 'Settings', 
    drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="drafts" size={24} style={{color: tintColor}} />
    )
};

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  drawerLabel: 'Drafts',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
};

const DrawerExample = DrawerNavigator(
  {
    Inbox: {
      path: '/',
      screen: InboxScreen,
    },
    Drafts: {
      path: '/sent',
      screen: DraftsScreen,
    },
    Settings: {
        path: '/settings', 
        screen: SettingScreen,
    }
  },
  {
    initialRouteName: 'Settings',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default DrawerExample;