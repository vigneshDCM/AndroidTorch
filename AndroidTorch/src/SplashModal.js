import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    Image,
    Modal,
    StatusBar,
    TouchableOpacity,

} from 'react-native'
import Colors from './constants/Colors'
import ImageLocation from './constants/ImageLocation'


const Torch = (props) => {

    const initial={
        torchStatus:false,
        mode:'TORCH',
        splash:false

    }

    const [torch,setTorch] = useState(initial)

    const torchOnPress=()=>{
        if(torch.mode==='TORCH'){
            setTorch({...torch,
                torchStatus:!torch.torchStatus
    
            })
        }else{
            setTorch({...torch,
                splash:!torch.splash
    
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
        <Modal
        visible={props.visible}>

       
        <View style={styles.mainContainer}>
        <StatusBar backgroundColor={'white'} barStyle={"dark-content"}/>
            <View style={styles.subContainer}>
               

                <View style={[styles.powerIconContainer]}>
                    <TouchableOpacity 
                    onPress={props.torchOnPress}
                    style={{width: 200, height: 200}}>
                    <Image
                        source={ImageLocation.powerIconBlack}
                        style={{ width: 200, height: 200 }}>

                    </Image>

                    </TouchableOpacity>
                    

                </View>

                

            </View>
           


        </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
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
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'yellow',
        borderWidth: 2,
        backgroundColor:'gray'
    },
    ledIndicatorCardFalse: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'yellow',
        borderWidth: 2,
        backgroundColor:'yellow'
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
        backgroundColor: 'yellow',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'yellow',
        height: 50,
        width: '100%',
        marginBottom: 10

    },
    screenModeContainer: {
        backgroundColor: 'gray',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'yellow',
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
        color: 'gray',
        fontSize:25
    },
    screenLable: {
        color: 'white',
        fontSize:25
    },

})

export default Torch