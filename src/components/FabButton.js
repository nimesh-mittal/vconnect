import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, ListItem, List, Left, Body, Right, Thumbnail,
  Tab, Tabs, TabHeading, View, Fab} from 'native-base';

export class FAB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.state = {text: '', active: false};
  }

  render() {
    return (
      <View>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#3BBFE2' }}
          position="bottomRight"
          onPress={() => this.props.onAdd()}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}
