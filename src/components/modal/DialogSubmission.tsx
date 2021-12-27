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
interface DialogSubmission {
  onPressAcpect: any;
  onPressClose: any;
  TotalVoucher: any;
  TotalVoucherPay: any;
  TotalPayAmount: any;
  PayCashAmount: any;
  PayBankAmount: any;
  onTextChange: any;
}
export const DialogSubmission = (props: DialogSubmission) => {
  const {
    onPressAcpect,
    onPressClose,
    TotalVoucher,
    TotalVoucherPay,
    TotalPayAmount,
    PayCashAmount,
    PayBankAmount,
    onTextChange,
  } = props;
  return (
    <KeyboardAvoidingView
      behavior='padding'
      enabled
      style={{
        height: hp(100),
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
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
                margin: 10,
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Nộp Phiếu
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
              paddingHorizontal: hp(1.5),
            }}
          >
            <View style={styles.header2}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Tổng số phiếu:{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                  }}
                >
                  {TotalVoucher}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Tổng số phiếu thanh toán:{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                  }}
                >
                  {TotalVoucherPay}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Tổng tiền thanh toán:{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                  }}
                >
                  {TotalPayAmount} đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Tiền mặt:{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                  }}
                >
                  {PayCashAmount} đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Chuyển khoản:{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                  }}
                >
                  {PayBankAmount} đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: hp(1),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(4.5),
                    color: mainColors.blackColor,
                    marginRight: wp(2),
                  }}
                >
                  Ghi chú:{' '}
                </Text>
                <TextInput
                  multiline={true}
                  onChangeText={onTextChange}
                  placeholder={'Nhập ghi chú'}
                  style={{
                    fontSize: wp(4),
                    width: '75%',
                    height: '100%',
                    backgroundColor: '#fff',
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    color: mainColors.blackColor,
                    padding: 0,
                    paddingLeft: 5,
                    borderColor:'#000',
                    borderWidth:1,
                    borderRadius:5,
                    paddingVertical:5
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={styles.header3}>
            <IconDetailCustom
                iconShow={true}
                onPress={() => {
                  onPressClose();
                }}
                labelStyle={{ color: mainColors.whiteColor, fontSize: wp(4) }}
                title={'Đóng'}
                sourceICon={Cancel}
                style={{
                  width: wp(30),
                  height: hp(5.5),
                  borderRadius: 5,
                  backgroundColor: mainColors.smokecolor,
                }}
              ></IconDetailCustom>
              <IconDetailCustom
                iconShow={true}
                onPress={() => {
                  onPressAcpect();
                }}
                labelStyle={{ color: mainColors.blackColor, fontSize: wp(4) }}
                title={'Đồng ý'}
                sourceICon={Check}
                style={{
                  width: wp(30),
                  height: hp(5.5),
                  borderRadius: 5,
                  backgroundColor: mainColors.greenscolor,
                }}
              ></IconDetailCustom>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    height: hp(55),
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
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
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    margin: 8,
  },
  header2: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  header3: {
    width: wp(80),
    height: hp(8),
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
