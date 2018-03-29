import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab, Card, CardItem, H1} from 'native-base';
import Timeline from 'react-native-timeline-listview';
import {FAB} from './../components/FabButton';
import axios from 'axios';
import {Title, Image} from 'react-native';
import {conf} from './../utils/config';
import call from 'react-native-phone-call';
import { Platform, Linking } from 'react-native';
import {FontAwesome, MaterialCommunityIcons} from 'react-native-vector-icons';
import moment from 'moment';

export class Activities extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.param}`,
    lead_id: `${navigation.state.params.lead_id}`,
    mobile: `${navigation.state.params.mobile}`,
    headerStyle: { backgroundColor: 'white', height: 20},
    headerTitleStyle: { color: '#EDC92F' }
  });

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
    this.state.activities = [];
    this.onCall = this.onCall.bind(this);
    this.onWhatsup = this.onWhatsup.bind(this);
    this.deleteLead = this.deleteLead.bind(this);
    axios.get(conf.firebase_url+'/leads/'+this.props.navigation.state.params.lead_id+'.json')
      .then(function (response) {
        this.setState({'activities': this.toJson(response.data.activities), isLoaded: true});
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  deleteLead(lead_id){
    axios.delete(conf.firebase_url+'/leads/'+lead_id+'.json')
      .then(function (response) {
        this.props.navigation.navigate('Contacts', {param: ''})
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  toJson(activities){
    var list = []
    for (var property in activities){
      var act = {}
      act.title = activities[property].title;
      act.time = moment(activities[property].time).fromNow();
      act.description = activities[property].description;
      list.push(act)
    }
    return list;
  }

  onCall(){
    return (e) => call({number:this.props.navigation.state.params.mobile}).catch(console.error);
  }

  onWhatsup(){
    return (e) => Linking.openURL('whatsapp://send?text=hello&phone=+91'+this.props.navigation.state.params.mobile)
  }

  render() {
        timeline = <Timeline data={this.state.activities} circleColor="#EA4949" lineColor="#EA4949"
            innerCircle={'dot'} style={{marginTop:20, margin: 10}} columnFormat='two-column'
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            separator={false}
            detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#65D4DF", borderRadius: 10}}
            options={{
              style:{paddingTop:5}
            }}/>
        if(!this.state.isLoaded){
          timeline = <Image
          style={{width: 300, height: 300, margin: 30}}
          source={require('./../images/loading.gif')}
        />
        }
        else if(this.state.activities == 0){
          timeline = <Image
          style={{width: 300, height: 300, margin: 30}}
          source={require('./../images/empty.png')}
        />
        }
        return (
          <Container>
            <Header style={{backgroundColor: '#EDC92F'}}>
              <Body><Text onPress={() => this.props.navigation.navigate('Contacts', {param: ''})}>{this.props.navigation.state.params.param}</Text></Body>
              <Right>
                <Icon style={{marginRight: 20}} name="call" onPress={this.onCall()}/>
                <FontAwesome style={{marginRight: 20}} size={30} name="whatsapp" onPress={this.onWhatsup()}/>
                <MaterialCommunityIcons style={{marginRight: 20}} size={30} name="account-remove" onPress={ e => this.deleteLead(this.props.navigation.state.params.lead_id)}/>
              </Right>
            </Header>
            <Content>
              {timeline}
            </Content>
            <FAB onAdd={() => this.props.navigation.navigate('AddActivity', {param: this.props.navigation.state.params.param, lead_id: this.props.navigation.state.params.lead_id})}/>
          </Container>
        )
  }
}
