import React from 'react'
import { View, Text,I18nManager, TouchableOpacity, StyleSheet } from 'react-native'
import Svg, {
    Path,
} from 'react-native-svg';
import Colors from '../../constants/Colors'


const LanguageSquare = (props) => {
    return (
        <View style={[styles.cardView,{backgroundColor:props.selected? Colors.highLightColor:Colors.mainBackground}]} elevation={5}>
             <BorderSVG selected={props.selected}/>
            <TouchableOpacity style={styles.cardDetailView} onPress={props.onPress}>
               
                <Text style={{color:props.selected? Colors.mainBackground:Colors.highLightColor,
                fontSize:20}}>{props.text}</Text>
              

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    cardView: {
        borderRadius: 15,
        marginTop: 10,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.mainBackground,
        borderWidth:2,
        borderColor: Colors.highLightColor
    }, cardDetailView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        //backgroundColor: Colors.highLightColor,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 10,
       // backgroundColor: Colors.highLightColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
})


export const BorderSVG = (props) => {

    return (
        <Svg height="42" width="36" style={{
            position: 'absolute',
            top: 0,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
            //borderTopLeftRadius: 10,
        }}>
            <Path
                d="M0 35,L0 10,A10 10,0 0,1 10,0,L30 0,A70 70  ,0 0,1 0,35  "
                fill={props.selected? Colors.mainBackground:Colors.highLightColor}
                stroke="none"
            />
        </Svg>
    )
}

export default LanguageSquare