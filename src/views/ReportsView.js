import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab, CardItem, Card} from 'native-base';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';
import {conf} from './../utils/config';

export class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLeads = this.getLeads.bind(this);
    axios.get(conf.firebase_url+'.json')
      .then(function (response) {
        this.setState({'leads': response.data.leads});
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  getLeads(){
    var listItems = [];
    var leads = this.state.leads;
    if(leads == undefined || leads == null){return [];}
    for (var property in leads){
      var name = leads[property] ? leads[property].name : '-'
      var activityCount = leads[property].activities == undefined ? 0 : Object.keys(leads[property].activities).length;
      console.log(name + " " + activityCount);
      listItems.push({'x': name, 'y': activityCount})
    }
    return listItems;
  }

  render() {
    let sampleData = this.getLeads();
        return  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>Coming soon</Text>
                  <Text note>25th March</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{margin:10}}>
              <PureChart data={sampleData} type='bar' height={200}/>
            </CardItem>
         </Card>
  }
}
