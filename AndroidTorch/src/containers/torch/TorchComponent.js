import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Alert
} from 'react-native'
import Torch from 'react-native-torch';
import DeviceInfo from 'react-native-device-info';

import SplashModal from '../../components/torch/SplashModal'
import Colors from '../../constants/Colors'
import ImageLocation from '../../constants/ImageLocation'
import ScreenBrightness from 'react-native-screen-brightness';
import PowerButton from '../../components/animations/PowerButton'
import ButtonComponentHOC from '../../components/animations/ButtonComponentHOC'
import NavigationBar from 'react-native-navbar-color'
import { withTranslation } from 'react-i18next'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import LanguageSlider from '../../components/torch/LanguageSlider'
// import LanguageSlider from '../../components/torch/TempLanguageSlider'
import i18n from '../../config/I18n'

import Svg, {
    G,
    Rect,
} from 'react-native-svg';

const TorchComponent = (props) => {
    const { t } = props
    // console.log('env',process.env.NODE_ENV)

    const initial = {
        torchStatus: true,
        mode: 'TORCH',
        splash: false

    }
    const initialCommon = {
        lightElevation: 3,
        indicatorElevation: 0,
        screenElevation: 0,
        statusBarVisible: true

    }



    const [brightness, setBrightness] = useState(0)
    const [torch, setTorch] = useState(initial)
    const [camPer, setCamPer] = useState(null)
    const [common, setCommon] = useState(initialCommon)
    const [batteryLevel, setbBatteryLevel] = useState(0)
    const [lang, setLang] = useState(null)
    const [clock, setClock] = useState({
        HH: '',
        MM: '',
        SS: ''
    })


    useEffect(() => {
        DeviceInfo.getBatteryLevel().then(batteryLevel => {
            let Blevel = batteryLevel * 100
            console.log('battery Level..', Blevel)

            setbBatteryLevel(Blevel.toFixed(0))
            // console.log('battery Level..',batteryLevel)
        });
        // console.log('time',new Date().getHours())
        setInterval(() => {
            setClock({
                HH: new Date().getHours(),
                MM: new Date().getMinutes(),
                SS: new Date().getSeconds()
            })

        }, 1000)


        NavigationBar.setColor(Colors.mainBackground)
        setLanguage()


        check_HW_SW_Permission()

        setTimeout(() => {
            SplashScreen.hide();
        }, 200)

    }, [])

    const setLanguage = async () => {
        try {
            const lang = await AsyncStorage.getItem('lang')
            if (lang !== null) {
                i18n.changeLanguage(lang);
                setLang(lang)
            }
            console.log('language set')

        } catch (e) {
            console.log('language', e)
            // error reading value
        }
    }
    const check_HW_SW_Permission = async () => {
        let permissionArr = []
        permissionArr[0] = await Torch.requestCameraPermission('Permission Required', 'Give Camera Permission for Access LED');
        if (permissionArr[0]) {
            setCamPer(permissionArr[0])
        }
        permissionArr[1] = await ScreenBrightness.hasPermission();
        //  console.log('perrrr',permissionArr[1])
        if (!permissionArr[1]) {
            Alert.alert('Need Permision To Redirect Setting', "Modifying Screen Brightness", [{
                text: 'OK',
                onPress: () => settingRedirection()
            }])
        }
        setInitialBrightnessLevel()
    }

    const settingRedirection = async () => {
        await ScreenBrightness.requestPermission()

    }

    const setInitialBrightnessLevel = () => {
        ScreenBrightness.getBrightness().then(brightness => {
            console.log('brightness', brightness);
            setBrightness(brightness)
        });
    }

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

    const torchOnPress = async () => {
        if (torch.mode === 'TORCH') {
            let status = !torch.torchStatus
            if (!torch.torchStatus) {
                setCommon({
                    ...common,
                    indicatorElevation: 0
                })

            } else {
                setCommon({
                    ...common,
                    indicatorElevation: 10
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
                    statusBarVisible: false
                })

            } else {
                brightnessCalculation('initial')
                await setCommon({
                    ...common,
                    statusBarVisible: true
                })
            }



            setTorch({
                ...torch,
                splash: status,
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

        if (data == 'TORCH') {
            setCommon({
                ...common,
                screenElevation: 0,
                lightElevation: 5
            })

        } else {
            setCommon({
                ...common,
                screenElevation: 5,
                lightElevation: 0
            })

        }

    }

    //console.log('time',clock)

    //  console.log('tor', torch.torchStatus)   
    return (
        <View style={styles.mainContainer}>
            <LinearGradient colors={[Colors.mainBackground, '#37444a', '#37444a', Colors.mainBackground]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >


                <StatusBar backgroundColor={Colors.mainBackground} barStyle={"light-content"} hidden={false} />
                <View style={styles.subContainer}>

                    <View style={{ width: '100%' }}>
                        <View style={styles.LedIndicatorContainer}>
                            <View
                                //      elevation={common.indicatorElevation} 
                                style={torch.torchStatus
                                    ? styles.ledIndicatorCardTrue
                                    : styles.ledIndicatorCardFalse
                                }>
                                <Image
                                    source={torch.torchStatus
                                        ? ImageLocation.torchIcon1
                                        : ImageLocation.torchIcon2}
                                    style={{ width: 40, height: 40 }}>
                                </Image>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 2 }}>

                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ fontSize: 15, color: Colors.highLightColor }}>
                                    {clock.HH}.
                    </Text >
                                <Text style={{ fontSize: 15, color: Colors.highLightColor }}>
                                    {clock.MM}
                                </Text>
                                <Text style={{ fontSize: 12, color: Colors.highLightColor }}> {clock.SS}
                                </Text>

                            </View>
                            <View style={{
                                width: '50%',
                                flexDirection: 'row',
                                alignItems: "center",
                                //backgroundColor:'red',
                                justifyContent: 'flex-end'
                            }}>
                                <View style={{

                                    //backgroundColor:'red'
                                }}>
                                    <BatterySvg
                                        width={"30"}
                                        height={"15"}
                                        percentage={batteryLevel}
                                        color={Colors.highLightColor} />

                                </View>


                                <Text style={{ fontSize: 13, color: Colors.highLightColor }}>{batteryLevel}%</Text>
                            </View>

                        </View >

                    </View>



                    <View style={[styles.powerIconContainer]}>
                        <PowerButton
                            onPress={torchOnPress}
                        />
                    </View>
                    <View style={styles.modeContainer}>

                        <ButtonComponentHOC onPressTouch={() => setMode('TORCH')}
                            //elevation={common.lightElevation}
                            styleTouch={styles.torchButton}
                            style={[styles.ledModeContainer, { backgroundColor: torch.mode == 'TORCH' ? Colors.highLightColor : Colors.mainBackground }]}>

                            <Text style={[styles.torchLable, { color: torch.mode == 'TORCH' ? Colors.mainBackground : Colors.highLightColor }]}>{t('Common:buttons.light')}</Text>


                        </ButtonComponentHOC>

                        <ButtonComponentHOC
                            onPressTouch={() => setMode('SCREEN')}
                            styleTouch={styles.screenButton}
                            // elevation={common.screenElevation}
                            style={[styles.screenModeContainer, { backgroundColor: torch.mode == 'TORCH' ? Colors.mainBackground : Colors.highLightColor }]}>

                            <Text style={[styles.screenLable, { color: torch.mode == 'TORCH' ? Colors.highLightColor : Colors.mainBackground }]}>{t('Common:buttons.screen')}</Text>



                        </ButtonComponentHOC>
                    </View>
                    {/* <View style={{
                    width:'100%',
                height:100,
                backgroundColor:'red'}}>
                <LanguageSlider /> 
                </View>*/}

                    <LanguageSlider lang={lang} />
                </View>
                <SplashModal
                    visible={torch.splash}
                    torchOnPress={torchOnPress}

                />
            </LinearGradient>

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
        height: 60,
        //justifyContent:'center',
        // backgroundColor:'yellow',


    },
    ledIndicatorCardTrue: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.highLightColor,
        borderWidth: 1,
        backgroundColor: Colors.mainBackground
    },
    ledIndicatorCardFalse: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.highLightColor,
        borderWidth: 1,
        backgroundColor: Colors.highLightColor
    },
    powerIconContainer: {
        //   backgroundColor:'yellow',
        //  flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

    },
    modeContainer: {
        //  flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40
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


export const BatterySvg = (props) => {

    let width = props.width ? props.width : "150"
    let height = props.height ? props.height : "60"
    let percentage = props.percentage ? props.percentage : 10
    let mainRectWidth = width - width / 3
    let mainRectHeight = height
    let tipRectWidth = width / 15
    let tipRectHeight = height / 3
    let tipRectSPoint = (mainRectHeight - tipRectHeight) / 2
    let tipRectEPoint = mainRectWidth
    let levelRectHeight = height
    let levelRectwidth = mainRectWidth * (percentage / 100)
    let levelColor = props.color ? props.color : "red"

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={width} height={height}>
                <G>

                    <Rect
                        x="0"
                        y="0"
                        // width="50"
                        width={levelRectwidth}
                        //  height="50"
                        height={levelRectHeight}
                        fill={levelColor}
                    // strokeWidth="1"
                    //stroke="rgb(0,0,0)"
                    />
                    <Rect
                        x="0"
                        y="0"
                        // width="100"
                        width={mainRectWidth}
                        //height="50"
                        height={mainRectHeight}
                        fill="rgba(0, 0, 0, 0)"
                        strokeWidth="3"
                        stroke={levelColor}
                    //"rgb(0,0,0)"
                    />
                    <Rect
                        x={tipRectEPoint}
                        // y="15"
                        y={tipRectSPoint}
                        // width="10"
                        width={tipRectWidth}
                        // height="20"
                        height={tipRectHeight}
                        // fill="white"
                        strokeWidth="3"
                        stroke={levelColor}
                    //"rgb(0,0,0)"
                    />
                </G>
            </Svg>

        </View>
    )
}



export default withTranslation()(TorchComponent)