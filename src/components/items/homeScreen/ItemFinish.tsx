import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../../constants';
import { TextInputCustom } from '../../userComponents/TextInputCustom';
import {
  BarCode,
  Box,
  Search,
  LOGOUTICON,
  Phone,
  Info,
  Check,
  Exchange2,
} from '../../../assets/index';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../../iconsCustom/IconDetailCustom';
import { receiveSaleInvoiceByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceByID';
import { GetSaleInvoiceNoteReceive } from '../../../screens/homeScreen/waiting/GetSaleInvoice';
import { Linking, Alert, Platform } from 'react-native';

interface ItemFinish {
  navigation?: any;
  onPressItem: any;
  codeOrder: string;
  index?: any;
  totalVoucher: number;
  totalPayAmount: number;
  payCashAmount: number;
  payBankAmount: number;
  colorItem: ViewStyle;
  colorText: TextStyle;
  shipperName: string;
}

export const ItemFinish = (props: ItemFinish) => {
  const { index, navigation, onPressItem, codeOrder, totalVoucher, totalPayAmount, payCashAmount, payBankAmount, colorItem, colorText, shipperName } = props;
  return (
    <TouchableOpacity
      style={[styles.container, colorItem]}
      onPress={() => {
        onPressItem(index);
      }}
    >
      <SafeAreaView>
        <View style={styles.item}>
          <View style={styles.header1}>
            <Text
              style={[{
                fontSize: wp(3.6),
                fontFamily: Fonts.Roboto_Stab_Bold,
              }, colorText]}
            >
              {codeOrder}
            </Text>
            <Text
              style={[{
                fontSize: wp(3.6),
                fontFamily: Fonts.Roboto_Stab_Bold,
              }, colorText]}
            >
              {shipperName}
            </Text>
          </View>
          <View style={styles.header1}>
            <View style={{ flexDirection: 'row', marginTop:hp(0.5) }}>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                  marginRight: wp(1.5),
                }, colorText]}
              >
                Số phiếu:
              </Text>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                }, colorText]}
              >
                {totalVoucher}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                  marginRight: wp(1.5),
                }, colorText]}
              >
                Tổng tiền:
              </Text>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                }, colorText]}
              >
                {totalPayAmount}đ
              </Text>
            </View>
          </View>
          <View style={styles.header1}>
            <View style={{ flexDirection: 'row', marginTop:hp(0.5) }}>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                  marginRight: wp(1.5),
                }, colorText]}
              >
                Tiền mặt:
              </Text>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                },colorText]}
              >
                {payCashAmount}đ
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                  marginRight: wp(1.5),
                }, colorText]}
              >
                Ngân hàng:
              </Text>
              <Text
                style={[{
                  fontSize: wp(3.6),
                  fontFamily: Fonts.Roboto_Slab_Regular,
                }, colorText]}
              >
                {payBankAmount}đ
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: hp(0.2),
    paddingHorizontal:wp(1)
  },
  item: {
    marginBottom: 5,
    paddingVertical: 2,
    paddingHorizontal: 3,
    marginTop: 5,
    flexDirection: 'column',
    borderColor: 'black',
  },
  header1: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header1_icon: {
    height: hp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header2: {
    marginTop: 5,
    marginBottom: 1,
    justifyContent: 'center',
  },
  header2_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header3: {
    width: '84%',
    flexDirection: 'row',
  },
  bottom: {
    marginBottom: 5,
    height: hp(5),
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  ButtonBottom: {
    width: wp(89) / 4,
    height: hp(5),
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: wp(3),
  },
});
