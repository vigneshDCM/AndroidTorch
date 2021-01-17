import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, I18nManager, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';
// import ImageLocation from '../../constants/ImageLocation'
import Colors from '../../constants/Colors'

var deviceHeight = Dimensions.get('window').height;
// var deviceWidth = Dimensions.get('window').width;
import i18n from '../../config/I18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSquare from './LanguageSquare'
const SAFE_VIEW_HEIGHT = 60
//const STATPOINT =  90

const LanguageSlider = (props) => {

    let panel = null

    const [langFocus, setLangFocus] = useState({})

    useEffect(() => {
        if (props.lang !== null) {
            setLangFocus({
                [props.lang]: true
            })

        }

    }, [props.lang])

    const [allowDragging, setAllowDragging] = useState(true)

    const changeLanguage = async (lang, p) => {
        try {
            i18n.changeLanguage(lang);
            await setLangFocus({
                [lang]: true
            })
            await AsyncStorage.setItem('lang', lang)
            panel.hide()
        } catch (e) {
            p.hide()
        }
    }



    // const onScroll = (event)=>{
    //     var currentOffset = event.nativeEvent.contentOffset.y;
    //     var direction = currentOffset > offSet ? 'down' : 'up';
    //     // setOffSet(currentOffset)
    //     //  if(currentOffset == 0){
    //     //     setIsScrollable(false)
    //     //  }else{
    //     //      setIsScrollable(true)
    //     //  }

    //   // console.log(direction,'currentOffset:',currentOffset,event.nativeEvent);
    //   }



    return (
        <SlidingUpPanel
            ref={c => panel = c}
            showBackdrop={true}
            backdropOpacity={0}
            containerStyle={{ marginHorizontal: -30, }}
            friction={0.4}
            draggableRange={{ top: deviceHeight - SAFE_VIEW_HEIGHT, bottom: 25 }}
            allowDragging={allowDragging}

        >
            <View style={styles.mainDragView}>
                {/* <Image
                    source={ImageLocation.mArrow}
                    style = {{transform:[
                        {
                            rotate:'-90deg'
                        }
                    ],width:50,
                    height:50,
                    
                }}

                    /> */}

                <View style={styles.dragHandler}/>

             
                <View style={styles.languageListContainer}>

                    <ScrollView style={{ width: '100%' }}
                        onTouchStart={() => setAllowDragging(false)}
                        onTouchEnd={() => setAllowDragging(true)}
                        onTouchCancel={() => setAllowDragging(true)}
                    >

                        <LanguageSquare
                            text={"Tamil"}
                            onPress={() => changeLanguage("tam", panel)}
                            selected={langFocus.tam}
                        />

                        <LanguageSquare
                            text={"English"}
                            onPress={() => changeLanguage("en", panel)}
                            selected={langFocus.en}
                        />
                        <LanguageSquare
                            text={"Hindi"}
                            onPress={() => changeLanguage("hin", panel)}
                            selected={langFocus.hin}
                        />
                        <LanguageSquare
                            text={"Telugu"}
                            onPress={() => changeLanguage("tel", panel)}
                            selected={langFocus.tel}
                        />

                        <LanguageSquare
                            text={"Bengali"}
                            onPress={() => changeLanguage("bengali", panel)}
                            selected={langFocus.bengali}

                        />

                        <LanguageSquare
                            text={"Gujarati"}
                            onPress={() => changeLanguage("gujarati", panel)}
                            selected={langFocus.gujarati}
                        />
                        <LanguageSquare
                            text={"Kannada"}
                            onPress={() => changeLanguage("kannada", panel)}
                            selected={langFocus.kannada}
                        />
                        <LanguageSquare
                            text={"Odia"}
                            onPress={() => changeLanguage("odia", panel)}
                            selected={langFocus.odia}
                        />

                        <LanguageSquare
                            text={"Punjabi"}
                            onPress={() => changeLanguage("punjabi", panel)}
                            selected={langFocus.punjabi}
                        />

                        <LanguageSquare
                            text={"Marathi"}
                            onPress={() => changeLanguage("marathi", panel)}
                            selected={langFocus.marathi}
                        />
                        <LanguageSquare
                            text={"Nepali"}
                            onPress={() => changeLanguage("nepali", panel)}
                            selected={langFocus.nepali}
                        />

                        <View style={{ height: 200, width: 80 }}/>
                      

                    </ScrollView>
                </View>
            </View>
        </SlidingUpPanel>


    )
}


const styles = StyleSheet.create({
    mainDragView:{
        alignItems: 'center',
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: Colors.highLightColor,
        borderWidth: 0.2,

        backgroundColor: Colors.mainBackground
    },
    dragHandler:{
        backgroundColor: Colors.highLightColor, 
        marginTop: 30, 
        width: 50,
        height: 2
    },
    languageLabel: {
        fontSize: 30,
        marginBottom: 20,
        color: Colors.highLightColor
    },
    languageListContainer: {
        backgroundColor: Colors.mainBackground,
        flex: 1,
        width: '80%',
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    cardView: {
        borderRadius: 10,
        marginTop: 10,
        height: 60,
        width: '100%',
        justifyContent: 'center',

        backgroundColor: 'white'
    }, cardDetailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        //backgroundColor:'red',
        paddingHorizontal: 30,

        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
})

export const BorderSVG = () => {

    return (
        <Svg height="42" width="36" style={{
            position: 'absolute',
            top: 0,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
            //borderTopLeftRadius: 10,
        }}>
            <Path
                d="M0 35,L0 10,A10 10,0 0,1 10,0,L30 0,A70 70  ,0 0,1 0,35  "
                fill="#0069AA1A"
                stroke="none"
            />
        </Svg>
    )
}


export default LanguageSlider