import React from 'react'
import { View, StyleSheet, Text, Image, ViewStyle, TextStyle, Platform, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';

import { BarCode, Box, Search, LOGOUTICON } from '../../assets/index';
import { TextInput, Button, Card, Searchbar } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
interface HeaderSearchFinish {
  onPressSearch: any;
  value?: any;
  _onChangeText?: any;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  onPressBarCode?:any
}
export const HeaderSearchFinish = (props: HeaderSearchFinish) => {
  const { value, onPressBarCode,style, titleStyle, onPressSearch, _onChangeText } = props
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.headertabview}>
        <View style={{ height: hp(6.8), borderRadius: 3, justifyContent: 'center', width: wp(60) }}>
          <Searchbar
            icon={Search}
            
            style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
            inputStyle={{ fontSize: wp(3.5) }}
            placeholder="Số Chứng Từ"
            onChangeText={_onChangeText}
            value={value}
          />
        </View>
     
        <View style={[styles.headertabview_iconsearch,
          Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
        ]}>
          <TouchableOpacity onPressIn={onPressSearch} style={{ backgroundColor: '#057DC0', height: hp(5), borderRadius: 5, width: wp(25), justifyContent: 'center', alignItems: 'center', marginBottom:5 }}>
            <Text style={{ fontSize: wp(3.5), color: 'white' }}>Tìm</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: 'black', height: 1.5 }}></View>
    </View>
  );

}
const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  headertabview: {
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headertabview_iconsearch: {
    paddingVertical:wp(2),
    width: wp(35),
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
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
  item: {
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 2,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    height: hp(20),
    borderRadius: 2
  }

})

