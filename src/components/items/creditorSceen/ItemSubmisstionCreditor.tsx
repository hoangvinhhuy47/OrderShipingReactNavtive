import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../../constants';
import Ripple from 'react-native-material-ripple';
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
import getDataByThing from '../../../utils/getDataByThing';
import CheckBox from '@react-native-community/checkbox';
interface ItemSubmisstionCreditor {
  customerCode?: string;
  navigation?: any;
  onPressItem: any;
  codeOrder: string;
  dateTime: string;
  nameCustomer: string;
  addressCustomer: string;
  noteOder?: String;
  typeItem: boolean;
  sourceIcon?: any;
  styleItem?: ViewStyle;
  onPressDetail: any;
  SaleVoiceID?: string;
  PhoneNumBer?: string;
  Option?: string;
  type?: string;
  Reload?: any;
  onPressAcept?: any;
  onPressGet?: any;
  onPressApply?: any;
  index?: any;
  onPressTransposition?: any;
  onPressReturn?: any;
  titleAcpect?: string;
  colortitle?: string;
  Status?: any;
  isChooseSubmiss:boolean;
  onPressChoose:any
}

export const ItemSubmisstionCreditor = (props: ItemSubmisstionCreditor) => {
  const [showIcon, setShowIcon] = useState(false);
 
  const {
    isChooseSubmiss,
    PhoneNumBer,
    Status,
    colortitle,
    customerCode,
    titleAcpect,
    onPressTransposition,
    onPressReturn,
    index,
    onPressApply,
    onPressAcept,
    onPressGet,
    onPressDetail,
    type,
    Reload,
    SaleVoiceID,
    styleItem,
    navigation,
    Option,
    onPressItem,
    codeOrder,
    dateTime,
    nameCustomer,
    addressCustomer,
    noteOder,
    sourceIcon,
    typeItem,
    onPressChoose,
  } = props;
  const CallCustomer = (phone: string) => {
    if (Platform.OS == 'android') {
      Linking.openURL('tel:' + phone + '').then((supported) => {
        if (!supported) {
          Alert.alert('Số điện thoại không đúng');
        } else {
          return Linking.openURL(phone);
        }
      });
    } else if (Platform.OS == 'ios') {
      Linking.openURL('tel:' + phone);
    }
  };

  const transportion = (name, typeOrder) => {
    navigation.push(name, {
      IDOrder: SaleVoiceID,
      TypeAPI: typeOrder,
    });
    //git pull orgin Sang
  };

  const onPress = (type: string) => {
    if (type == '1') {
      onPressAcept(SaleVoiceID);
    } else if (type == '3') {
      onPressGet(SaleVoiceID, index);
    } else if (type == '4') {
      onPressApply(SaleVoiceID, index);
    } else if (type == '5') {
      // onPressTransposition(SaleVoiceID);
    }
  };

  return (
    <Card style={[styles.container, styleItem]}>
      <TouchableOpacity
        onPress={() => {
          onPressItem(index);
        }}
      >
        <View style={[styles.item, styleItem]}>
          {/* headder */}
          <View style={styles.header}>
            <View style={styles.header1}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {Platform.OS === 'ios' ? (
                  <CheckBox
                    style={{ marginRight: 5 }}
                    boxType='square'
                    disabled={false}
                    value={isChooseSubmiss}
                    onValueChange={() => {onPressChoose(index)}}
                  />
                ) : (
                  <CheckBox
                    disabled={false}
                    value={isChooseSubmiss}
                    onValueChange={() => {onPressChoose(index)}}
                  />
                )}
              </View>
              {colortitle == null ? (
                <Text
                  style={{
                    fontSize: wp(3.6),
                    color: 'black',
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontWeight: '700',
                  }}
                >
                  {codeOrder}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: wp(3.6),
                    color: colortitle,
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontWeight: '700',
                  }}
                >
                  {codeOrder}
                </Text>
              )}
            </View>
            <View style={{ justifyContent: 'center' }}>
              {colortitle == null ? (
                <Text
                  style={{
                    fontSize: wp(3.6),
                    color: 'black',
                    fontFamily: Fonts.Roboto_Stab_Bold,
                  }}
                >
                  {getDataByThing.getDayMonthYearHourStringDetail(dateTime)}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: wp(3.6),
                    color: colortitle,
                    fontFamily: Fonts.Roboto_Stab_Bold,
                  }}
                >
                  {getDataByThing.getDayMonthYearHourStringDetail(dateTime)}
                </Text>
              )}
            </View>
          </View>
          {/* headder2 */}
          <View style={styles.header2}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 8,
                alignItems: 'center',
              }}
            >
              {colortitle == null ? (
                <Text
                  style={{
                    fontSize: wp(4),
                    color: 'black',
                    fontFamily: Fonts.Roboto_Slab_Light,
                    fontWeight: '700',
                  }}
                >
                  {customerCode} - {nameCustomer}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: wp(4),
                    color: colortitle,
                    fontFamily: Fonts.Roboto_Slab_Light,
                    fontWeight: '700',
                  }}
                >
                  {customerCode} - {nameCustomer}
                </Text>
              )}
            </View>
          </View>
          {addressCustomer ? (
            <View style={styles.header2_icon}>
              {colortitle == null ? (
                <Text
                  style={{
                    width: wp(95),
                    fontSize: wp(3.8),
                    color: mainColors.blackColor,
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontStyle: 'italic',
                  }}
                >
                  {addressCustomer}
                </Text>
              ) : (
                <Text
                  style={{
                    width: wp(95),
                    fontSize: wp(3.8),
                    color: colortitle,
                    fontFamily: Fonts.Roboto_Slab_Regular,
                    fontStyle: 'italic',
                  }}
                >
                  {addressCustomer}
                </Text>
              )}
            </View>
          ) : (
            <View />
          )}
          {noteOder ? (
            <View style={styles.header3}>
              <Text
                style={{
                  fontSize: wp(3.5),
                  color: '#ca0000',
                  fontFamily: Fonts.Roboto_Stab_Bold,
                  marginRight: 5,
                  fontStyle: 'italic',
                }}
              >
                Ghi chú:
              </Text>
              <Text
                style={{
                  fontSize: wp(3.5),
                  color: '#ca0000',
                  fontFamily: Fonts.Roboto_Stab_Bold,
                  fontStyle: 'italic',
                }}
              >
                {noteOder}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </TouchableOpacity>

      {Status == true ? (
        <View style={styles.bottom}>
          <IconDetailCustom
            iconShow={true}
            onPress={() => {
              CallCustomer(PhoneNumBer);
            }}
            labelStyle={{ color: mainColors.greenscolor, fontSize: wp(4) }}
            title={'Gọi'}
            sourceICon={Phone}
            style={styles.ButtonBottom}
          ></IconDetailCustom>

          <IconDetailCustom
            iconShow={true}
            onPress={onPressDetail}
            labelStyle={{ color: mainColors.blue, fontSize: wp(3) }}
            title={'Chi tiết'}
            sourceICon={Info}
            style={styles.ButtonBottom}
          ></IconDetailCustom>

          {Option == '7' ? (
            <IconDetailCustom
              iconShow={true}
              onPress={() => {
                onPressReturn(SaleVoiceID, index);
              }}
              labelStyle={{ color: mainColors.blue, fontSize: wp(3) }}
              title={'Trả Phiếu'}
              sourceICon={Exchange2}
              style={styles.ButtonBottom}
            ></IconDetailCustom>
          ) : (
            <View></View>
          )}
          {/* {Option == '1' ? <IconDetailCustom
                    iconShow={true}
                    onPress={() => onPress(type)}
                    labelStyle={{ color: mainColors.greenscolor, fontSize: wp(2.8) }}
                    title={'Nộp Phiếu'}
                    sourceICon={Check}
                    style={styles.ButtonBottom}></IconDetailCustom> : <View></View>} */}
        </View>
      ) : (
        <View></View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 2,
    borderBottomWidth: 2,
    paddingHorizontal: 2,
  },
  item: {
    marginBottom: 5,
    paddingVertical: 2,
    paddingHorizontal: 3,
    marginTop: 5,
    flexDirection: 'column',
    borderColor: 'black',
    backgroundColor: '#fff',
  },
  header: {
    height: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header1: {
    justifyContent: 'center',
    maxWidth: wp(58),
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
