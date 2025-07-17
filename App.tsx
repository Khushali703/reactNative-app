/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  StyleSheet,
  SafeAreaView
} from 'react-native';



import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux_store/store';



function App(): React.JSX.Element {

  return (
    <Provider store={store}>
    <NavigationContainer>
     <SafeAreaView style={styles.container}> 
      <AppNavigator/>
    </SafeAreaView>
   </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
  },
    scrollContent: {
    paddingBottom: 100, // space for bottom tab
  },
});

export default App;
