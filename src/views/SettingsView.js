import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab, Card, CardItem} from 'native-base';

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: ''};
  }

  render() {
    return (
      <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
              <Body>
                <Text>Coming soon</Text>
                <Text note>25th March</Text>
              </Body>
            </Left>
          </CardItem>
       </Card>
    );
  }
}
