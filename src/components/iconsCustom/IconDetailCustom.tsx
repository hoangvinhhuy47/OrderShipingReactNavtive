import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,
    ViewStyle,
    ImageSourcePropType,
    TouchableOpacity,
    Platform

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';

interface IconDetailCustom {
    title: string,
    onPress: any;
    style?: ViewStyle;
    sourceICon?: ImageSourcePropType;
    labelStyle?: ViewStyle;
    type?: string
    onPressAccpect?: any
    SaleVoiceID?: string
    typeCode?:string
}

export const IconDetailCustom = (props: any) => {
    const { title, SaleVoiceID, onPressAccpect,typeCode, onPress, type, style, sourceICon, labelStyle } = props;

    return (

        <TouchableOpacity onPressIn={onPress} style={[styles.container, style,
            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
        ]}>
            <Image source={sourceICon} style={{ width: hp(3), height: hp(3), resizeMode: 'contain', }}></Image>
            <View style={{width:'70%', justifyContent:'center', alignItems:'center'}}>
              <Text style={[styles.textSyle, labelStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>


    )


}
const styles = StyleSheet.create({
    container: {
        paddingLeft:1,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    shadowAndroid: {
        elevation: 5,
      },
      shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
      },
    textSyle: {
        fontSize: wp(5),
        fontWeight: 'bold'
    }

})