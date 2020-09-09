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

    const initial = {
        torchStatus: true,
        mode: 'TORCH',
        splash: false

    }
    const initialCommon = {
        lightElevation: 3,
        indicatorElevation: 0,
        screenElevation: 0,
        statusBarVisible:true

    }


    const [brightness, setBrightness] = useState(0)
    const [torch, setTorch] = useState(initial)
    const [camPer,setCamPer] = useState(null)
    const [brightnessPer,setBrightnessPer] = useState(null)
    const [common,setCommon] = useState(initialCommon)
   

    const checkCameraPermission = async () => {
        const cameraAllowed = await Torch.requestCameraPermission('Permission Required','Give Camera Permission for Access LED');
        if (!cameraAllowed) {
            Alert.alert('Camera Permission Required')
        } else {
            console.log('Camera Permission Approved');
        }
        setCamPer(cameraAllowed)
    }


    const setInitialBrightnessLevel = () => {
        ScreenBrightness.getBrightness().then(brightness => {
            console.log('brightness', brightness);
            setBrightness(brightness)
        });
    }


    const RequestPermissionBrightnessControl = async () => {
        let hasPerm = await ScreenBrightness.hasPermission();
        let permission = false
        permission = await ScreenBrightness.requestPermission();
        if (!hasPerm) {
            console.log('Redirecting to Setting....')
            return;
        } else {
            console.log('Denied to Redirecting to Setting....')

        }
        console.log('Brightness Permission status....',permission,hasPerm)
        setBrightnessPer(hasPerm)
    }

    useEffect(() => {
        checkCameraPermission()
        setInitialBrightnessLevel()
        RequestPermissionBrightnessControl();
    }, [])


    
    
    const brightnessCalculation = async (data) => {
        let brightnessPoint;
        console.log('data', data)
        if (data === 'full') {

            brightnessPoint = 1

        } else {
            brightnessPoint = brightness / 255


        }

        let hasPerm = await ScreenBrightness.hasPermission();
        if (!hasPerm) {
            ScreenBrightness.requestPermission();
            return;
        }
        console.log((Number(brightnessPoint.toFixed(1))), 'dfhjk')
        ScreenBrightness.setBrightness(Number(brightnessPoint.toFixed(1)));




    }

   

    const torchOnPress = async() => {
        if (torch.mode === 'TORCH') {
            let status = !torch.torchStatus
            if(!torch.torchStatus){
                setCommon({
                    ...common,
                    indicatorElevation:0
                })
    
            }else{
                setCommon({
                    ...common,
                    indicatorElevation:10
                })
    

            }
           

                if (camPer) {
                    setTorch({
                        ...torch,
                        torchStatus: status
                    })
                    Torch.switchState(torch.torchStatus);
                }
            
        } else {
            let status = !torch.splash
            if (!torch.splash) {
                brightnessCalculation('full')
                await setCommon({
                    ...common,
                    statusBarVisible:false
                })

            } else {
                brightnessCalculation('initial')
                await setCommon({
                    ...common,
                    statusBarVisible:true
                })
            }



            setTorch({
                ...torch,
                splash:status,
                //mode:torch.splash? 'TORCH'

            })


        }
        //console.log('press', torch.torchStatus)


    }


    const setMode = (data) => {
        setTorch({
            ...torch,
            mode: data
        })

        if(data=='TORCH'){
            setCommon({
                ...common,
                screenElevation:0,
                lightElevation:5
            })

        }else{
            setCommon({
                ...common,
                screenElevation:5,
                lightElevation:0
            })

        }
       
    }



    console.log('tor', torch.torchStatus)
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={Colors.mainBackground} barStyle={"light-content"} hidden={false} />
            <View style={styles.subContainer}>
                <View style={styles.LedIndicatorContainer}>
                    <View elevation={common.indicatorElevation} style={torch.torchStatus
                        ? styles.ledIndicatorCardTrue
                        : styles.ledIndicatorCardFalse
                    }


                    >
                        <Image
                            source={torch.torchStatus
                                ? ImageLocation.torchIcon1
                                : ImageLocation.torchIcon2}
                            style={{ width: 50, height: 50 }}>

                        </Image>

                    </View>

                </View>

                <View style={[styles.powerIconContainer]}>
                    <TouchableOpacity
                        onPress={torchOnPress}
                        style={{ width: 200, height: 200 }}>
                        <Image
                            source={ImageLocation.powerIconWhite}
                            style={{ width: 200, height: 200 }}>

                        </Image>

                    </TouchableOpacity>


                </View>

                <View style={styles.modeContainer}>

                    <View elevation={common.lightElevation} style={[styles.ledModeContainer, { backgroundColor: torch.mode == 'TORCH' ? Colors.highLightColor : Colors.mainBackground }]}>
                        <TouchableOpacity
                            onPress={() => setMode('TORCH')}
                            style={styles.torchButton}>
                            <Text style={[styles.torchLable, { color: torch.mode == 'TORCH' ? Colors.mainBackground : Colors.highLightColor }]}>LIGHT</Text>
                        </TouchableOpacity>

                    </View>

                    <View elevation={common.screenElevation} style={[styles.screenModeContainer, { backgroundColor: torch.mode == 'TORCH' ? Colors.mainBackground : Colors.highLightColor }]}>
                        <TouchableOpacity
                            onPress={() => setMode('SCREEN')}
                            style={styles.screenButton}>
                            <Text style={[styles.screenLable, { color: torch.mode == 'TORCH' ? Colors.highLightColor : Colors.mainBackground }]}>SCREEN</Text>

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
        backgroundColor: Colors.mainBackground
    },
    ledIndicatorCardFalse: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.highLightColor,
        borderWidth: 1,
        backgroundColor: Colors.highLightColor
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
        fontSize: 25
    },
    screenLable: {
        color: 'white',
        fontSize: 25
    },

})



export default TorchComponent