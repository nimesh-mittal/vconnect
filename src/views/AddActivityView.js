import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab, InputGroup, Input, Form, Item, Label} from 'native-base';
import Timeline from 'react-native-timeline-listview';
import axios from 'axios';
import moment from 'moment';
import {conf} from './../utils/config';

export class AddActivity extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.param}`,
    lead_id: `${navigation.state.params.lead_id}`
   });

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
    this.addActivity = this.addActivity.bind(this);
  }

  addActivity(){
    var activity = {
      'title': this.state.title,
      'description': this.state.description,
      'time': moment().format()
    }
    axios.post(conf.firebase_url+'/leads/'+this.props.navigation.state.params.lead_id+'/activities.json', activity)
      .then(function (response) {
        this.props.navigation.navigate('Details', {param: this.props.navigation.state.params.param, lead_id: this.props.navigation.state.params.lead_id})
        console.log(response)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
        return (<Form>
            <Item floatingLabel style={{margin: 20}}>
              <Label>Title</Label>
              <Input onChangeText={ e => {this.setState({"title": e}) }}/>
            </Item>
            <Item floatingLabel last style={{margin: 20}}>
              <Label>Description</Label>
              <Input onChangeText={ e => {this.setState({"description": e}) }}/>
            </Item>

            <Button block primary style={{margin: 20, backgroundColor: '#EDC92F'}} onPress={ e => {this.addActivity()}}><Text> Add New Activity </Text></Button>
          </Form>)
  }
}
