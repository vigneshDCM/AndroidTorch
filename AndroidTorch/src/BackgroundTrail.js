import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const BackgroundTrail = ()=> {

    return (
        
        <View style={{flex:1,backgroundColor:'orange'}}>
            <LinearGradient colors={['#16191f', '#2e3547', '#16191f']} 
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >
  
</LinearGradient>

        </View>
    )

}

const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });

export default BackgroundTrail