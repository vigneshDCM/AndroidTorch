import React from 'react'
import { TouchableOpacity, StyleSheet, Animated } from 'react-native'



function ButtonComponentHOC(props) {
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
            props.onPressTouch()
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
    return (
        <>
            <Animated.View
            {...props}
                style={[props.style, containerAnimation]}
            >
                <TouchableOpacity
                    onPress={press}
                    style={props.styleTouch}
                >
                    {props.children}

                </TouchableOpacity>

            </Animated.View>


        </>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        height: 60,
        width: '80%',
        backgroundColor: 'yellow'
    }
})

ButtonComponentHOC.defaultProps = {
    style: {
        height: 60,
        width: '80%',
        backgroundColor: 'yellow'
    }
    
}

export default ButtonComponentHOC