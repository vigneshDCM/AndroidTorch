/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
 
} from 'react-native';
import TorchComponent from './src/TorchComponent'
import SplashScreen from 'react-native-splash-screen'
import i18n from './src/config/I18n';
import { I18nextProvider } from 'react-i18next';

const App = () => {

  // useEffect(() => {


  //   SplashScreen.hide();
  // }, []);

  return (
    <>
       <I18nextProvider i18n={i18n}>
       <TorchComponent/>
       </I18nextProvider>
       
       
     
    </>
  );
};



export default App;
