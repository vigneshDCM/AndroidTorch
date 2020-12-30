import React from 'react'
// import {View} from 'react-native'
 import Bridge from './src/containers/startup/Bridge'


// import SplashScreen from 'react-native-splash-screen'
const App = () => {
 // SplashScreen.hide();

  if(process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line
    console = {};
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  
    console.assert = () => {};
    console.clear = () => {};
    console.count = () => {};
    console.group = () => {};
    console.groupCollapsed = () => {};
    console.groupEnd = () => {};
    console.info = () => {};
    console.table = () => {};
    console.time = () => {};
    console.timeEnd = () => {};
    console.trace = () => {};
  
  }
  return (
       <Bridge/>
  );
};






export default App;
