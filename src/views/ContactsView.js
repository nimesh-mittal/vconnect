import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, Fab, InputGroup, Input} from 'native-base';
import {View, Image} from 'react-native';
import {FAB} from './../components/FabButton';
import axios from 'axios';
import {conf} from './../utils/config';

export class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
    this.state.leads = {};
    this.addLeads = this.addLeads.bind(this);
    this.onShowDetails = this.onShowDetails.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state.list = []

    axios.get(conf.firebase_url+'.json')
      .then(function (response) {
        this.setState({'leads': response.data.leads});
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  onShowDetails(name, id, mobile){
    return (e) => {this.props.navigation.navigate('Details', {param: name, lead_id: id, mobile: mobile}) }
  }

  onRefresh(){
    axios.get(conf.firebase_url+'.json')
      .then(function (response) {
        this.setState({'leads': response.data.leads});
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  addLeads(){
    var list = [];
    var leads = this.state.leads;
    for (var property in leads){
      var image_url = leads[property].image_url
      var mobile = leads[property] ? leads[property].mobile : '-'
      var name = leads[property] ? leads[property].name : '-'

      for (var first in leads[property].activities);
      var activity = leads[property].activities ? leads[property].activities[first].description : 'no last activity found'

      list.push(<ListItem avatar key={property} onPress={ this.onShowDetails(name, property, mobile)}>
        <Left>
          <Thumbnail source={require('./../images/avatar.png')}/>
        </Left>
        <Body>
          <Text>{name}</Text>
          <Text note>{activity}</Text>
        </Body>
        <Right>
          <Text note>{mobile}</Text>
        </Right>
      </ListItem>)
    }
    return list;
  }

  render() {
    loading = (<Image
                  style={{width: 300, height: 300, margin: 30}}
                  source={require('./../images/loading.gif')}
                />)
    leads = this.state.leads == {} ? loading : this.addLeads();
    return (
      <Container>
          <Content>
            <List refreshControl={this.onRefresh()}>
              {leads}
            </List>
          </Content>
          <FAB onAdd={() => this.props.navigation.navigate('AddContact', {param: ''})}/>
        </Container>
    );
  }
}
