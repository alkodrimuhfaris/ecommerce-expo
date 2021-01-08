import React, {Component} from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import store from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <SafeAreaView style={styles.parent}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Main />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
});
