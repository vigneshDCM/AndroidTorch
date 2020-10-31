import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, Animated} from 'react-native'
import Colors from '../../constants/Colors'
import ImageLocation from '../../constants/ImageLocation'
const PowerButton = (props) => {

    const onPress = () => {
        props.onPress()

    }

    let initial = new Animated.Value(1)



    const press = async () => {
        // setTimeout(()=>{
            
        // },1000)

        Animated.sequence([
            Animated.timing(initial, {
                toValue: .9,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(initial, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })

        ]).start(()=>{
            props.onPress()
        })
        

        // Animated.timing(initial,{
        //     toValue:1,
        //     duration:300,
        //     useNativeDriver:true
        // }).start()
    }


    let containerAnimation = {
        transform: [
            {
                scale: initial
            }
        ]

        //opacity:initial
    }


    return(
        // <TouchableOpacity 
        // onPress={onPress}
        // elevation={2} 
        // style={styles.mainContainer}>

        //     <View style={styles.subContainer}>

        //     </View>

        // </TouchableOpacity>
        <Animated.View 
        elevation={2} 
        style={[styles.mainContainer,containerAnimation]}>
            <TouchableOpacity
            style={{flex:1,
                alignItems:'center',
                justifyContent:'center'}}
                onPress={press}>
            {/* <View style={styles.subContainer}> */}
            <Image
                            source={ImageLocation.powerIconWhite}
                            style={styles.subContainer}></Image>

    {/* </View> */}

            </TouchableOpacity>
        </Animated.View>
    )
}

const styles =StyleSheet.create({
    mainContainer:{
        width:230,
        height:230,
        backgroundColor:Colors.mainBackground,
        borderWidth:5,
        borderColor:Colors.highLightColor,
        borderRadius:120,
        alignItems:'center',
        justifyContent:'center'

    },
    subContainer:{
        width:120,
        height:120,
        
        backgroundColor:Colors.mainBackground,
        borderWidth:5,
        borderColor:Colors.highLightColor,
        borderRadius:100,

    }
})

export default PowerButton