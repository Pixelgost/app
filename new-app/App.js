import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import Page1 from './pages/landingPage';
import Page2 from './pages/signInPage';
import Page3 from './pages/signInPage2';
import Page4 from './pages/mainPage';
import Page5 from './pages/loginPage';
import Page6 from './pages/profilePage';
import Page7 from './pages/ItemAdditionPage';

import Constants from 'expo-constants';

export default class App extends React.Component {
  state = {
    page: 1,
  };

  pickPageToRender = () => {
    if (this.state.page === 1){
      return (<Page1 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 2) {
      return (<Page2 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 3) {
      return (<Page3 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 4) {
      return (<Page4 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 5) {
      return (<Page5 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 6) {
      return (<Page6 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 7) {
      return (<Page7 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.pickPageToRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


