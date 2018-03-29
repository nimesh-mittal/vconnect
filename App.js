import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Item, Input, InputGroup, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, Fab} from 'native-base';
import {Font, AppLoading } from "expo";
import {View, Icon, Platform} from 'react-native';

import {FAB} from './src/components/FabButton'
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import {Activities} from './src/views/ActivitiesView';
import {Contacts} from './src/views/ContactsView';
import {Reports} from './src/views/ReportsView';
import {Settings} from './src/views/SettingsView';
import {AddContact} from './src/views/AddContactView';
import {AddActivity} from './src/views/AddActivityView';

import { TabNavigator, StackNavigator } from 'react-navigation';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
  }

  async componentWillMount() {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  });
  this.setState({ loading: true });
}

  render() {
    if (this.state.loading) {
    return (
      <FeedStack />
    );}
    return <AppLoading />
  }
}

export const FeedStack = StackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: "Leads",
      header: null
    },
  },
  Details: {screen: Activities},
  AddContact: {screen: AddContact,
    navigationOptions: {
      title: "Add New Lead",
      header: null
    },
  },
  AddActivity: {screen: AddActivity,
    navigationOptions: {
      title: "Add New Activity",
      header: null
    },
  }
},{ headerMode: 'none' });

export default TabNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      tabBarLabel: 'Leads',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='user' size={26} color={tintColor} />
    },
  },
  Report: {
    screen: Reports,
    navigationOptions: {
      tabBarLabel: 'Reports',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='bubble-chart' size={26} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='settings' size={26} color={tintColor} />
    },
  }
},
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#FFFFFF',  // Color of tab when pressed
      inactiveTintColor: '#FFFFFF', // Color of tab when not pressed
      showIcon: 'true', // Shows an icon for both iOS and Android
      showLabel: (Platform.OS == 'android'), //No label for Android
      labelStyle: {
        fontSize: 8,
      },
      style: {
        paddingTop: 12,
        backgroundColor: '#3BBFE2', // Makes Android tab bar white instead of standard blue
        height: (Platform.OS === 'ios') ? 50 : 70 // I didn't use this in my app, so the numbers may be off.
      }
    },
});
