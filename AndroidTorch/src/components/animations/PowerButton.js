import React from 'react'
import {View,Text,StyleSheet,Image, TouchableOpacity, Animated} from 'react-native'
import Colors from '../../constants/Colors'
import ImageLocation from '../../constants/ImageLocation'
import LinearGradient from 'react-native-linear-gradient'; 
const PowerButton = (props) => {

    const onPress = () => {
        props.onPress()

    }

    let initial = new Animated.Value(0.9)



    const press = async () => {
        // setTimeout(()=>{
            
        // },1000)
        

        Animated.sequence([
            Animated.timing(initial, {
                toValue: .8,
                duration: 100,
                useNativeDriver: false
             })
             ,
            Animated.timing(initial, {
                toValue: .9,
                duration: 100,
                useNativeDriver: false
            })

        ]).start(()=>{
            props.onPress()
        })
        

        // Animated.timing(initial,{
        //     toValue:1,
        //     duration:300,
        //     useNativeDriver:true
        // }).start(()=>{
        //    // props.onPress()
        // })
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
       
<View style={[styles.mainContainer,{backgroundColor:'black',overflow:'hidden'}]}>
<LinearGradient 

colors={['black',  '#37444a','#37444a', 'black']} 
            style={{ width:'100%',height:'100%'}}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
<Animated.View 
        //elevation={2} 
        style={[styles.mainContainer,{overflow:'hidden',width:'100%',height:'100%'},containerAnimation]}>
            <LinearGradient 

colors={[Colors.mainBackground,  '#37444a','#37444a', Colors.mainBackground]} 
            style={{ width:'100%',height:'100%'}}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >

             <TouchableOpacity
            style={{flex:1,
                alignItems:'center',
                justifyContent:'center'}}
                onPress={press}>
         
            <Image
                            source={ImageLocation.powerIconWhite}
                            style={styles.subContainer}></Image>

   

            </TouchableOpacity> 

            </LinearGradient>
        </Animated.View>
        </LinearGradient>

</View>

        
    )
}

const styles =StyleSheet.create({
    mainContainer:{
        width:230,
        height:230,
        backgroundColor:Colors.mainBackground,
        //backgroundColor:Colors.mainBackground,
        borderWidth:2,
        borderColor:Colors.mainBackground,
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