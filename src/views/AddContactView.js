import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab, InputGroup, Input, Form, Item, Label, InputText} from 'native-base';
import Timeline from 'react-native-timeline-listview';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';
import {conf} from './../utils/config';

export class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
    this.addLead = this.addLead.bind(this);
  }

  addLead(){
    var lead = {
      'name': this.state.name,
      'mobile': this.state.mobile
    }
    axios.post(conf.firebase_url+'/leads.json', lead)
      .then(function (response) {
        this.props.navigation.navigate('Contacts', {param: ''})
        console.log(response)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
        return (<Form>
            <Item floatingLabel style={{margin: 20}}>
              <Label>Full Name</Label>
              <Input onChangeText={ e => {this.setState({"name": e}) }}/>
            </Item>
            <Item floatingLabel style={{margin: 20}}>
              <Label>Email</Label>
              <Input onChangeText={ e => {this.setState({"email": e})}}/>
            </Item>
            <Item floatingLabel style={{margin: 20}}>
              <Label>Mobile</Label>
              <Input onChangeText={ e => {this.setState({"mobile": e})}}/>
            </Item>
            <Item floatingLabel style={{margin: 20}}>
              <Label>Phone</Label>
              <Input onChangeText={ e => {this.setState({"phone": e})}}/>
            </Item>
            <Button block primary style={{margin: 20, backgroundColor: '#EDC92F'}} onPress={ e => {this.addLead()}}><Text> Add New Contact </Text></Button>
          </Form>)
  }
}
