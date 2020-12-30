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
import Colors from '../../constants/Colors'
import ImageLocation from '../../constants/ImageLocation'


const Torch = (props) => {

    return (
        <Modal
            visible={props.visible}
            transparent>
                <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent={false} />
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={[styles.powerIconContainer]}>
                        <TouchableOpacity
                            onPress={props.torchOnPress}
                            style={{ width: 200, height: 200 }}>
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
        backgroundColor: Colors.splashColor,
        flex: 1

    },
    subContainer: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 30

    },
    
    powerIconContainer: {
        // backgroundColor:'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }

})

export default Torch