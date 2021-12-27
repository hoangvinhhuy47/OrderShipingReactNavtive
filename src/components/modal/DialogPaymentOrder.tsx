import { BackgroundBigScreen } from '../../../src/components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
  PickerIOS,

} from 'react-native';
import Ripple from 'react-native-material-ripple';

import React, { useState, useEffect } from 'react';
import { BarCode, Box, Search, LOGOUTICON, Receiver, Cancel } from '../../assets/index';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-toast-message';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { mainColors } from '../../constants';
import { GetTypeBanking } from '../../screens/homeScreen/detailEnvoice/GetTypeBanking';
import lodash from 'lodash';
import { SaleInvoiceDetailClient, PaymentInfo } from '../object/Order';
import { handOutSaleInvoice } from '../../screens/homeScreen/detailEnvoice/PaymentOrder';
import getDataByThing from '../../utils/getDataByThing';
import { RadioButton, List, Checkbox } from 'react-native-paper';
interface DialogPaymentOrder {
  onPressClosePay?: any;
  navigation?: any;
  SaleInvoiceDetailClient?: any;
  TotalPrice?: any;
  SaleInvoiceClient?: any;
}
export const DialogPaymentOrder = (props: DialogPaymentOrder) => {
  const { DataTypeBanking, onPressGetBanking } = GetTypeBanking(props);
  const { onPressClosePay, navigation, SaleInvoiceDetailClient, SaleInvoiceClient, TotalPrice } =
    props;
  const { onPressHandout } = handOutSaleInvoice(props);

  const [show, setshow] = useState(1);
  const [stringPrice, setStringPrice] = useState(0);
  const [stringTitle, setStringTitle] = useState('');
  const [stringTNote, setStringTNote] = useState('');
  const [Check, setCheck] = useState(true);
  const [Check1, setCheck1] = useState(true);
  const [Index, setIndex] = useState(0)
  const [dataPayment, setdataPayment] = useState<PaymentInfo>({
    PaymentMethodID: '',
    AccountBankingTypeID: '',
    Amount: '',
    Notes: '',
  });
  const [PricePay, setPricePay] = useState(TotalPrice);
  const [PriceTake, setPriceTake] = useState(TotalPrice);
  const [visible, setVisible] = useState(false);
   const [value, setValue] = React.useState('Loai Thanh Toan');
  const [STT, setSTT] = useState('checked')
  const [STT1, setSTT1] = useState('unchecked')
  const hideDialog = () => setVisible(false);
  const onTextChangePrice = (value: any) => {
    // let newText = '';
    // let numbers = '0123456789';

    // for (var i = 0; i < value.length; i++) {
    //   if (numbers.indexOf(value[i]) > -1) {
    //     newText = newText + value[i];
    //   }
    //   else {
    //     console.log('babc')
    //   }
    // }
    try {
      // if (value > TotalPrice) {

      //   setPricePay(0);
      // } else {
      
        setStringPrice(value);
        setPricePay(TotalPrice - value);
        setdataPayment({ ...dataPayment, Amount: value });
        setPriceTake(value);
      //  console.log(TotalPrice - value.toFixed(0))
      // }
    } catch (E) { }

  };
  const onTextChangeTitle = (value: any) => {
    if (value != '') {
      setStringTitle(value);
      try {
        setdataPayment({ ...dataPayment, Notes: value });
      } catch (E) { }
    }
  };
  const onTextChangeNote = (value: any) => {
    if (value != '') {
      setStringTNote(value);
      SaleInvoiceClient.Notes = value;
    }
  };
  const onPressAccpectPayment = async () => {
    if (Check == true) {
      if (await onPressHandout(SaleInvoiceClient, SaleInvoiceDetailClient, dataPayment)) {
        setTimeout(() => {
          onPressClosePay();
          props.navigation.goBack();
        }, 200);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Không Thành Công',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Vui Lòng Kiểm Tra Lại',
      });
    }
  };
  const onChangeValue = () => {
    if (Check1 == true) {
      setCheck1(false)
      const _temp = {
        ...dataPayment,
        PaymentMethodID: '2',
      };
      setdataPayment(_temp);
      setshow(2);

    }
    else {
      setCheck1(true)
      const _temp = {
        ...dataPayment,
        PaymentMethodID: '1',
      };
      setdataPayment(_temp);

      setshow(1);

    }
  };
  const onSelectTypePay = (value: any) => {
    if (lodash.isEmpty(DataTypeBanking)) {
    } else {
      try {
        const _temp = {
          ...dataPayment,

          AccountBankingTypeID: DataTypeBanking[value].AccountBankingTypeID.toString(),
        };

        setdataPayment(_temp);
        setValue(DataTypeBanking[value].TypeName.toString())
        hideDialog()

        // hideDialog()
      } catch (E) { }
    }
  };
  const getdata = async () => {
    await onPressGetBanking();
    if (lodash.isEmpty(DataTypeBanking) == false) {
      const _temp = {
        ...dataPayment,

        AccountBankingTypeID: DataTypeBanking[0].AccountBankingTypeID.toString(),
      };
      setdataPayment(_temp);

    }
  };

  useEffect(() => {
    const _temp = {
      ...dataPayment,
      PaymentMethodID: '1',
      Amount: TotalPrice,
    };
    setdataPayment(_temp);
    getdata();
    return () => { };
  }, []);


  const data = [{ key: 1, label: 'Tiền Mặt' }, { key: 2, label: 'Ngân Hàng' }]
  return (
    <KeyboardAvoidingView
      behavior='padding'
      enabled
      style={{
        height: hp(100),
        width: wp(100),
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <View style={styles.containerBig}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ color: '#fff', fontSize: wp(5) }}>Thanh Toán Hóa Đơn</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.view_item}>
              <Text style={{ fontSize: wp(4), width: wp(30) }}>Hình Thức: </Text>

              <View
                style={{

                  width: wp(65),
                  height: hp(6),

                }}
              >
                {/* Dialog Hình Thức Thanh Toán */}
                {Platform.select({
                  ios: (
                    <View style={{
                      width: wp(65),
                      height: hp(7),
                      flexDirection: 'row',
                      justifyContent: 'space-around'
                    }}>
                      <Checkbox.Item mode='ios' position={'leading'} onPress={() => { onChangeValue() }} labelStyle={{ fontSize: hp(2) }} status={Check1 == true ? 'checked' : 'unchecked'} label={'Tiền Mặt'} ></Checkbox.Item>
                      <Checkbox.Item mode='ios' position={'leading'} onPress={() => { onChangeValue() }} labelStyle={{ fontSize: hp(2) }} status={Check1 == true ? 'unchecked' : 'checked'} label={'Ngân Hàng'} ></Checkbox.Item>
                    </View>
                  ),
                  android: (
                    <View style={{
                      width: wp(65),
                      height: hp(6),
                      flexDirection: 'row',
                      justifyContent: 'space-around'
                    }}>
                      <Checkbox.Item mode='android' position={'leading'} onPress={() => { onChangeValue() }} labelStyle={{ fontSize: hp(2) }} status={Check1 == true ? 'checked' : 'unchecked'} label={'Tiền Mặt'} ></Checkbox.Item>
                      <Checkbox.Item mode='android' position={'leading'} onPress={() => { onChangeValue() }} labelStyle={{ fontSize: hp(2) }} status={Check1 == true ? 'unchecked' : 'checked'} label={'Ngân Hàng'} ></Checkbox.Item>
                    </View>

                  )
                })}
              </View>
            </View>

            {show == 2 ? (
              <View style={styles.view_item}>
                <Text style={{ fontSize: wp(4), width: wp(30) }}>Loại: </Text>

                <TouchableOpacity
                  onPress={() => {
                    setVisible(true)
                  }}
                  style={{
                    width: wp(55),
                    height: hp(6),
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ fontSize: hp(2) }}>{value}</Text>
                  {/* Dialog Loại Thanh Toán */}
                  {
                    Platform.select({
                      ios: (
                        <Modal
                          animationType='slide'
                          transparent
                          visible={visible}
                          presentationStyle='formSheet'
                          style={{ justifyContent: 'center', margin: 0 }}
                          onDismiss={hideDialog}
                        >
                          <TouchableOpacity style={styles.containerBig} onPress={() => hideDialog()} >
                            <View style={{ width: wp(80), backgroundColor: 'white', padding: wp(2) }}>
                              {DataTypeBanking.map((item, index) => {
                                return (
                                  <List.Item onPress={() => { onSelectTypePay(index) }}
                                    title={index + 1 + item.TypeName}
                                  >
                                  </List.Item>
                                );
                              })}

                            </View>
                          </TouchableOpacity>
                        </Modal>

                      ),
                      android: (
                        <Modal
                          animationType='slide'
                          transparent
                          visible={visible}
                          presentationStyle='formSheet'
                          style={{ justifyContent: 'center', margin: 0 }}
                          onDismiss={hideDialog}
                        >
                          <TouchableOpacity style={styles.containerBig} onPress={() => hideDialog()} >
                            <View style={{ width: wp(80), backgroundColor: 'white', padding: wp(2) }}>
                              {DataTypeBanking.map((item, index) => {
                                return (
                                  <List.Item onPress={() => { onSelectTypePay(index) }}
                                    title={index + 1 + '.' + ' ' + item.TypeName}
                                  >
                                  </List.Item>
                                );
                              })}

                            </View>
                          </TouchableOpacity>
                        </Modal>
                      )
                    })
                  }
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}

            {/*Tổng Tiền*/}
            <View style={styles.view_item}>
              <Text style={{ fontSize: wp(4), width: wp(30) }}>Tổng Tiền: </Text>
              <View
                style={{
                  borderColor: 'red',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: hp(5),
                  width: wp(55),
                }}
              >
                <Text
                  style={{
                    backgroundColor: 'white',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: wp(4),
                  }}
                >
                  {' '}
                  {getDataByThing.getcurrency(TotalPrice.toString())}
                </Text>
              </View>
            </View>

            {/*Số Tiền Nhận*/}
            <View style={styles.view_item}>
              <Text style={{ fontSize: wp(4), width: wp(30) }}>Số Tiền Nhận: </Text>
              <View>
                <TextInput

                  clearTextOnFocus={true}
                  onChangeText={(text) => onTextChangePrice(text)}
                  keyboardType='numeric'
                  style={{
                    height: hp(5),
                    width: wp(55),
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: '500',
                    fontSize: wp(4),
                    padding: 0,
                    paddingLeft: wp(1),
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  {' '}
                </TextInput>
              </View>
            </View>

            {/* Số Tiền Còn*/}
            <View style={styles.view_item}>
              <Text style={{ fontSize: wp(4), width: wp(30) }}>Số Tiền Còn: </Text>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: hp(5),
                  width: wp(55),
                }}
              >
                <Text
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: '500',
                    fontSize: wp(4),
                  }}
                >
                  {' '}
                  {getDataByThing.getcurrency(PricePay.toString())}
                </Text>
              </View>
            </View>
            {/* Nội Dung */}

            {show == 2 ? (
              <View style={styles.view_item1}>
                <Text style={{ fontSize: wp(4), width: wp(30) }}>Nội Dung: </Text>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => onTextChangeTitle(text)}
                    style={{
                      height: hp(8),
                      width: wp(55),
                      backgroundColor: 'white',
                      color: 'black',
                      fontWeight: '500',
                      fontSize: wp(4),
                      textAlignVertical: 'top',
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  >
                    {' '}
                  </TextInput>
                </View>
              </View>
            ) : (
              <View></View>
            )}

            {/* Ghi Chú */}

            <View style={styles.view_item1}>
              <Text style={{ fontSize: wp(4), width: wp(30) }}>Ghi Chú: </Text>
              <View>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => onTextChangeNote(text)}
                  style={{
                    height: hp(8),
                    width: wp(55),
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: '500',
                    fontSize: wp(4),
                    textAlignVertical: 'top',
                    padding: wp(1),
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  {' '}
                </TextInput>
              </View>
            </View>
          </View>

          <View style={styles.bottom_Button}>
            <Ripple
              style={[
                {
                  height: hp(5.2),
                  width: wp(25),
                  backgroundColor: mainColors.smokecolor,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}
              onPressIn={onPressClosePay}
            >
              <Text style={{ color: 'black', fontSize: wp(4) }}>Đóng</Text>
            </Ripple>
            <Ripple
              style={[
                {
                  height: hp(5.2),
                  width: wp(25),
                  backgroundColor: mainColors.greenscolor,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
              ]}
              onPressIn={onPressAccpectPayment}
            >
              <Text style={{ color: 'white', fontSize: wp(4) }}>Chấp Nhận</Text>
            </Ripple>
          </View>
        </View>
      </View >
      <Toast position={'bottom'} visibilityTime={5} ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView >
  );
};
const styles = StyleSheet.create({
  containerBig: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    height: hp(75),
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 8,
  },
  header: {
    height: hp(7),
    width: '100%',
    paddingHorizontal: wp(1.5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColors.greenscolor,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  main: {
    paddingLeft: wp(1),
    paddingRight: wp(1),
    marginTop: hp(1),
    height: hp(48),

    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  view_item: {
    marginTop: hp(1),
    height: hp(6),
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  view_item1: {
    marginTop: hp(1),
    height: hp(10),
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  bottom_Button: {
    width: '80%',
    marginTop: hp(10),
    height: hp(8),
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
});