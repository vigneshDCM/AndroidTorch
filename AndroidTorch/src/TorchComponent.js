import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    Image,
    Modal,
    TouchableOpacity,
    StatusBar,
    platform,
    Alert
} from 'react-native'
import Torch from 'react-native-torch';

import SplashModal from './SplashModal'
import Colors from './constants/Colors'
import ImageLocation from './constants/ImageLocation'
import ScreenBrightness from 'react-native-screen-brightness';


const TorchComponent = () => {

    let  cameraAllowed;
useEffect(()=>{

   cameraAllowed = Torch.requestCameraPermission(
        'Camera Permissions', // dialog title
        'We require camera permissions to use the torch on the back of your phone.' // dialog body
    );

    if (!cameraAllowed) {
        Alert.alert('Permission Denied')
    }
   

    ScreenBrightness.getBrightness().then(brightness => {
        console.log('brightness', brightness);
        setBrightness(brightness)
      });
})
    const initial={
        torchStatus:true,
        mode:'TORCH',
        splash:false

    }

    const brightnessCalculation = async(data) => {
        let brightnessPoint;
console.log('data', data)
        if(data==='full'){
            
            brightnessPoint = 1
       
        }else{
            brightnessPoint = brightness/255
            

        }
        
        let hasPerm = await ScreenBrightness.hasPermission();
        if(!hasPerm){
            ScreenBrightness.requestPermission();
            return;
       }
       console.log((Number(brightnessPoint.toFixed(1))),'dfhjk')
       ScreenBrightness.setBrightness(Number(brightnessPoint.toFixed(1)));

        
        

    }

    const [brightness,setBrightness] = useState(0)

    const [torch,setTorch] = useState(initial)

    const torchOnPress=()=>{
        if(torch.mode==='TORCH'){
            setTorch({...torch,
                torchStatus:!torch.torchStatus
    
            }
              
            )
            if (Platform.OS === 'ios') {
                Torch.switchState(torch.torchStatus);
            } else {
             
                if (cameraAllowed) {
                    Torch.switchState(torch.torchStatus);
                }
            }
            

        }else{
            if(!torch.splash){
                brightnessCalculation('full')
               
            }else{
                brightnessCalculation('initial')
            }
            setTorch({...torch,
                splash:!torch.splash,
                //mode:torch.splash? 'TORCH'
    
            })
            
            
        }
        console.log('press',torch.torchStatus)
       

    }


    const setMode = (data) => {
        setTorch({
            ...torch,
            mode:data
        })
    }



console.log('tor',torch.torchStatus)
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={Colors.mainBackground} barStyle={"light-content"}/>
            <View style={styles.subContainer}>
                <View style={styles.LedIndicatorContainer}>
                    <View elevation={5} style={torch.torchStatus
                                  ? styles.ledIndicatorCardTrue
                                  : styles.ledIndicatorCardFalse
                                }
                                
                                
                               >
                        <Image
                        source={torch.torchStatus
                            ? ImageLocation.torchIcon1
                            : ImageLocation.torchIcon2}
                        style={{width:50,height:50}}>

                        </Image>

                    </View>

                </View>

                <View style={[styles.powerIconContainer]}>
                    <TouchableOpacity 
                    onPress={torchOnPress}
                    style={{width: 200, height: 200}}>
                    <Image 
                        source={ImageLocation.powerIconWhite}
                        style={{ width: 200, height: 200 }}>

                    </Image>

                    </TouchableOpacity>
                    

                </View>

                <View style={styles.modeContainer}>

                    <View elevation={3} style={[styles.ledModeContainer,{backgroundColor:torch.mode=='TORCH'? Colors.highLightColor:Colors.mainBackground}]}>
                        <TouchableOpacity
                            onPress={() => setMode('TORCH')}
                            style={styles.torchButton}>
                            <Text style={[styles.torchLable,{color:torch.mode=='TORCH'? Colors.mainBackground:Colors.highLightColor}]}>Light</Text>
                        </TouchableOpacity>

                    </View>

                    <View elevation={3} style={[styles.screenModeContainer,{backgroundColor:torch.mode=='TORCH'? Colors.mainBackground:Colors.highLightColor}]}>
                        <TouchableOpacity
                            onPress={() => setMode('SCREEN')}
                            style={styles.screenButton}>
                            <Text style={[styles.screenLable,{color:torch.mode=='TORCH'? Colors.highLightColor:Colors.mainBackground}]}>Screen</Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>
            <SplashModal
            visible={torch.splash}
            torchOnPress={torchOnPress}
            
            />


        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        //backgroundColor: '#2e2725',
        backgroundColor: Colors.mainBackground,
        flex: 1

    },
    subContainer: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 30

    },
    LedIndicatorContainer: {
        flex: 1
        //justifyContent:'center',
        // backgroundColor:'yellow',


    },
    ledIndicatorCardTrue: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.highLightColor,
        borderWidth: 1,
        backgroundColor:Colors.mainBackground
    },
    ledIndicatorCardFalse: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.highLightColor,
        borderWidth: 1,
        backgroundColor:Colors.highLightColor
    },
    powerIconContainer: {
        // backgroundColor:'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    modeContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    ledModeContainer: {
        backgroundColor: Colors.highLightColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.highLightColor,
        height: 50,
        width: '100%',
        marginBottom: 10

    },
    screenModeContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.highLightColor,
        height: 50,
        width: '100%'

    },
    screenButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    torchButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    torchLable: {
        color: '#1e1e1e',
        fontSize:25
    },
    screenLable: {
        color: 'white',
        fontSize:25
    },

})



export default TorchComponent