import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
 
export default class MiniLanguageSlider extends Component
{
    constructor()
    {
        super();

        if( Platform.OS === 'android' )
        {

          UIManager.setLayoutAnimationEnabledExperimental(true);

        }
 
        this.state = { 

           textLayoutHeight: 0,
           updatedHeight: 0, 
           expand: false,
           buttonText : 'Click Here To Expand'
          
          }

    }
 
    expand_collapse_Function =()=>
    {
        LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
 
        if( this.state.expand == false )
        {
            this.setState({ 
              updatedHeight: this.state.textLayoutHeight, 
              expand: true, 
              buttonText: 'Click Here To Collapse' 
            }); 
        }
        else
        {
            this.setState({ 
              updatedHeight: 0, 
              expand: false, 
              buttonText: 'Click Here To Expand' 
            });
        }
    }
 
    getHeight(height)
    {
        this.setState({ textLayoutHeight: height });
        console.log('height..',height)
    }
 
    render()
    {
        return(
         <View style = { styles.MainContainer }>

                <View style = { styles.ChildView }>

                    

                    
                    <View style = {{ height: this.state.updatedHeight,
                        overflow:'hidden',
                        //marginTop:30,
                        
                        }}>


                        <Text style = { styles.ExpandViewInsideText } 
                              onLayout = {( value ) => this.getHeight( value.nativeEvent.layout.height )}>
                            
                            Hello Developers, A warm welcome on ReactNativeCode.com, The best website for react native developers.
                            You can find high quality dynamic type of tutorials with examples on my website and to support us please like our Facebook page.
                            Hello Developers, A warm welcome on ReactNativeCode.com, The best website for react native developers.
                            You can find high quality dynamic type of tutorials with examples on my website and to support us please like our Facebook page.
                          


                        </Text>
                    
                    
                    </View>
                    <TouchableOpacity activeOpacity = { 0.7 } 
                                      onPress = { this.expand_collapse_Function } 
                                      style = { styles.TouchableOpacityStyle }>


                        <Text style = { styles.TouchableOpacityTitleText }>{this.state.buttonText}</Text>

                   
                    </TouchableOpacity>
                
                </View>
                
            
             </View>
        );
    }
}
 
const styles = StyleSheet.create(
{
    MainContainer:
    {
        backgroundColor:'red',
       // flex: 1,
       //height:500,
        flexDirection:'column-reverse',
        alignItems: 'flex-end',
        
    },

    ChildView:
    {
        backgroundColor:'yellow',
      
        borderWidth: 1,
        borderColor: '#00BCD4',
        margin: 5
    },
 
    TouchableOpacityStyle:
    {
        padding: 10,
        backgroundColor: '#00BCD4',
        position:'absolute' 
    },

    TouchableOpacityTitleText:
    {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    },

    ExpandViewInsideText:
    {
        fontSize: 16,
        color: '#000',
        padding: 12
    }
});

//export default MiniLanguageSlider