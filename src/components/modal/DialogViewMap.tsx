import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { TextInputCustom } from '../userComponents/TextInputCustom';
import { BarCode, Box, Search, LOGOUTICON, Phone, Cancel, Check } from '../../assets/index';
import { Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import Toast from 'react-native-toast-message';
interface DialogViewMap {
  onPressClose: any;
  CustomerName: string;
  CustomerAdress: string;
  CustomerNumber: string;
  CustomerNote: string;
  SaleInVoceID: string;
  props1: any;
  onPressDetail:any;
}

export const DialogViewMap = (props: DialogViewMap) => {
  const {
    onPressClose,
    props1,
    CustomerName,
    CustomerAdress,
    CustomerNote,
    SaleInVoceID,
    CustomerNumber,
    onPressDetail
  } = props;
  const CallCustomer = (phone: string) => {
    if (Platform.OS == 'android') {
      Linking.openURL('tel:' + phone + '').then((supported) => {
        if (!supported) {
          Alert.alert('Số điện thoại không đúng');
        } else {
          onPressClose();
          return Linking.openURL(phone);
        }
      });
    } else if (Platform.OS == 'ios') {
      Linking.openURL('tel:' + phone);
    }
  };
  return (
    <View style={styles.containerBig}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: mainColors.greenscolor,
            width: '100%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: 'bold',
              margin: 8,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Thông Tin Đơn Hàng
          </Text>
        </View>
        <View style={styles.header2}>
          <Text style={styles.txt}>Tên khách hàng:</Text>
          <Text style={[styles.txt, { marginLeft: wp(2) }]}>{CustomerName}</Text>
        </View>
        <View style={{padding:wp(2), height:hp(9), justifyContent:'center'}}>
          <Text style={[styles.txt]}>
            Địa Chỉ: {CustomerAdress}
          </Text>
        </View>
        <View style={styles.header2}>
          <Text style={styles.txt}>SĐT:</Text>
          <Text style={[styles.txt, { marginLeft: wp(2) }]}>{CustomerNumber}</Text>
        </View>
        <View style={{padding:wp(2), height:hp(9), justifyContent:'center'}}>
          <Text style={styles.txt}>Ghi Chú: {CustomerNote? CustomerNote:'Không có ghi chú'}</Text>
        </View>
        <View style={styles.header4}>
          <TouchableOpacity
            onPress={() => {
              onPressDetail()
            }}
            style={[{borderColor: mainColors.blue}, styles.ButtonB, Platform.OS === 'ios'? styles.shadowIos : styles.shadowAndroid]}
          >
            <Text
              style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.Roboto_Slab_Regular,
                fontStyle: 'italic',
                color: mainColors.blue,
              }}
            >
              {' '}
              Chi Tiết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              CallCustomer(CustomerNumber);
            }}
            style={[{borderColor: mainColors.greenscolor}, styles.ButtonB, Platform.OS === 'ios'? styles.shadowIos : styles.shadowAndroid]}
          >
            <Text
              style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.Roboto_Slab_Regular,
                fontStyle: 'italic',
                color: mainColors.greenscolor,
              }}
            >
              {' '}
              Gọi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{borderColor: mainColors.blackColor}, styles.ButtonB, Platform.OS === 'ios'? styles.shadowIos : styles.shadowAndroid]}
            onPress={() => {}}
          >
            <Text style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.Roboto_Slab_Regular,
                fontStyle: 'italic',
                color: '#000',
              }}>Chỉ Đường</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{borderColor: mainColors.blackColor}, styles.ButtonB, Platform.OS === 'ios'? styles.shadowIos : styles.shadowAndroid]}
            onPress={() => {
              onPressClose();
            }}
          >
            <Text style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.Roboto_Slab_Regular,
                fontStyle: 'italic',
                color: '#000',
              }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBig: {
    alignItems: 'stretch',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    marginHorizontal: 1,
    height: hp(43),
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: mainColors.smokecolor,
  },
  header1: {
    width: wp(70),
    height: hp(7),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header1_view: {
    width: wp(70),
    height: hp(6),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  header2: {
    height:hp(6),
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical:wp(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header4: {
    height:hp(5),
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical:wp(2),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header3: {
    width: wp(80),
    height: hp(8),
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txt: {
    fontSize: wp(4.2),
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontStyle: 'italic',
    color: mainColors.blackColor,
  },
  ButtonB: {
    marginLeft:wp(5),
    height: hp(5),
    width: wp(20),
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIos: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },
});
