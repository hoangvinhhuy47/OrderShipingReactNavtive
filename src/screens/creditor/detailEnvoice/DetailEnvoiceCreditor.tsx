import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Fonts, mainColors } from '../../../constants/index';
import { BackgroundDetailCellScreen } from '../../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import {
  BarCode,
  Phone,
  Box,
  Search,
  LOGOUTICON,
  Receiver,
  FILES,
  Cancel,
  Check,
  Exchange2,
  GHIM,
} from '../../../assets/index';
import { Linking, Alert, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IconDetailCustom } from '../../../components/iconsCustom/IconDetailCustom';
import getDataByThing from '../../../utils/getDataByThing';
import { getSaleInvoiceCreditorById } from './GetSaleInvoiceCreditorById';
import { ItemsDetailCustom } from '../../../components/items/homeScreen/ItemDetailCustom';
import { DialogQRCode } from '../../../components/modal/DialogQRCode';
import { recievedSaleInvoiceCreditor } from '../waiting/RecievedSaleInvoiceCreditor';
import { returnSaleInvoiceCreditor } from '../handle/ReturnSaleInvoiceCreditor';
import { DialogPaymentCreditor } from '../../../components/modal/DialogPaymentCreditor';
import { actionMain } from '../../../utils/mainActions';
const DetailAccptanceOther = (props: any) => {
  const { Data } = props.route.params;
  const {
    GetData,
    dataSaleInvoice,
    dataGetSaleInvoiceCreditorById,
    IDOrder,
    setIDSaleVoice,
    setdataGetSaleInvoiceCreditorById,
    setdataSaleInvoice,
  } = getSaleInvoiceCreditorById(props);
  const { onPressAccept } = recievedSaleInvoiceCreditor(props);
  const { onPressReturnSaleInvoiceCreditor } = returnSaleInvoiceCreditor(props);
  const [VisbleDialogQRCode, setVisbleDialogQRCode] = useState(false);
  const [TotalPriceBill, setTotalPriceBill] = useState(0);
  const [VisbleDialog2, setVisbleDialog2] = useState(false);

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
  const RecievedSaleInvoiceCreditor = async (ID: string) => {
    if (await onPressAccept(ID)) {
      props.navigation.goBack();
    } else {
      actionMain.showModalWarm({
        status: true,
        title: 'Thông báo',
        content: 'Nhận phiếu không thành công!',
      });
    }
  };
  const ReturnSaleInvoiceCreditor = async (ID: string) => {
    if (await onPressReturnSaleInvoiceCreditor(ID)) {
      props.navigation.goBack();
    } else {
      actionMain.showModalWarm({
        status: true,
        title: 'Thông báo',
        content: 'Nhận phiếu không thành công!',
      });
    }
  };
  const showDialogQRCode = () => {
    if (VisbleDialogQRCode == true) {
      setVisbleDialogQRCode(false);
    } else {
      setVisbleDialogQRCode(true);
    }
  };
  const toggleModalVisibilityQRCode = () => {
    setVisbleDialogQRCode(!!VisbleDialogQRCode);
  };
  const getData = async () => {
    await GetData(Data.SaleInvoiceID);
  };

  /// hàm tính tổng tiền
  useEffect(() => {
    SumTotalPrice();
  }, [dataGetSaleInvoiceCreditorById]);
  useEffect(() => {
    setTotalPriceBill(TotalPriceBill);
  }, [TotalPriceBill]);
  const SumTotalPrice = async () => {
    try {
      let a = 0;
      for (var i = 0; i < dataGetSaleInvoiceCreditorById.length; i++) {
        let Amount = 0;
        let DiscountAmount = 0;
        let TaxAmount = 0;
        let TotalAmount = 0;
        Amount =
          dataGetSaleInvoiceCreditorById[i].Quantity * dataGetSaleInvoiceCreditorById[i].Price;
        DiscountAmount = Amount * (dataGetSaleInvoiceCreditorById[i].DiscountPercent / 100);
        TaxAmount =
          (Amount - DiscountAmount) * (dataGetSaleInvoiceCreditorById[i].TaxPercent / 100);
        TotalAmount = Amount - DiscountAmount + TaxAmount;
        a = a + Number.parseInt(TotalAmount.toFixed(0));
      }
      setTotalPriceBill(a);
    } catch (E) {}
  };
  const toggleModalVisibility2 = () => {
    setVisbleDialog2(!!VisbleDialog2);
  };
  const showDialogPayment = (value: any) => {
    if (VisbleDialog2 == true) {
      setVisbleDialog2(false);
    } else {
      setVisbleDialog2(true);
    }
  };
  const DebitSaleInvoiceCreditor = () => {
    showDialogPayment(1);
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getData();
    });
    return () => {};
  }, []);
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackgroundDetailCellScreen
          goBack={() => goBack()}
          title='Chi Tiết Phiếu'
          navigation={props.navigation}
        >
          <View style={styles.containerheader}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Roboto_Stab_Bold,
                  fontSize: wp(3.8),
                  color: mainColors.blackColor,
                }}
              >
                {Data.Code}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto_Stab_Bold,
                  fontSize: wp(3.8),
                  color: mainColors.blackColor,
                }}
              >
                {getDataByThing.getDayMonthYearHourStringDetail(Data.DeliveryDate)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(0.5),
              }}
            >
              <View style={{ width: '90%' }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto_Stab_Bold,
                    fontSize: wp(3.6),
                    color: mainColors.blackColor,
                  }}
                >
                  {Data.CustomerCode} - {Data.CustomerName}
                </Text>
              </View>
              <TouchableOpacity onPress={() => showDialogQRCode()} style={{ width: '10%' }}>
                <Image
                  source={BarCode}
                  style={{
                    height: hp(3.5),
                    width: wp(5),
                    aspectRatio: 1,
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(0.5),
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Roboto_Slab_Regular,
                  fontSize: wp(3.6),
                  color: mainColors.blackColor,
                  fontStyle: 'italic',
                }}
              >
                {Data.ShipAddress}
              </Text>
            </View>
          </View>
          <View style={styles.containerBody}>
            <FlatList
              keyExtractor={(item, index) => 'key' + index}
              data={dataGetSaleInvoiceCreditorById}
              renderItem={({ item, index }) => (
                <ItemsDetailCustom
                  nameItem={index + 1 + '. ' + item.ProductName}
                  onPressItem={{}}
                  quantityItem={item.Quantity.toString()}
                  unitItem={item.UnitName}
                  indexItem={index}
                  titleItem={item.Notes}
                  index={index.toString()}
                ></ItemsDetailCustom>
              )}
            ></FlatList>
          </View>
          <View style={styles.containerBottom}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: Fonts.Roboto_Stab_Bold, fontSize: wp(5.5), color: 'red' }}>
                Tổng tiền:
              </Text>
              <Text style={{ fontFamily: Fonts.Roboto_Stab_Bold, fontSize: wp(5.5), color: 'red' }}>
                {getDataByThing.getcurrency(TotalPriceBill.toString()) + ' VNĐ'}
              </Text>
            </View>
            <View style={styles.bottom}>
              <IconDetailCustom
                iconShow={true}
                onPress={() => CallCustomer(Data.CustomerPhone)}
                labelStyle={{ color: mainColors.whiteColor, fontSize: wp(4) }}
                title={'Gọi'}
                sourceICon={Phone}
                style={styles.ButtonBottomgreen}
              ></IconDetailCustom>
              {Data.CreditorStatus == 1 ? (
                <IconDetailCustom
                  iconShow={true}
                  onPress={() => RecievedSaleInvoiceCreditor(Data.SaleInvoiceID)}
                  labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                  title={'Nhận Phiếu'}
                  sourceICon={Check}
                  style={styles.ButtonBottomgreen}
                ></IconDetailCustom>
              ) : Data.CreditorStatus == 2 ? (
                <View style = {{flexDirection:'row'}}>
                  <IconDetailCustom
                    iconShow={true}
                    onPress={() => DebitSaleInvoiceCreditor()}
                    labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                    title={'Thanh toán'}
                    sourceICon={Check}
                    style={styles.ButtonBottomgreen}
                  ></IconDetailCustom>
                  <IconDetailCustom
                    iconShow={true}
                    onPress={() => ReturnSaleInvoiceCreditor(Data.SaleInvoiceID)}
                    labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                    title={'Trả phiếu'}
                    sourceICon={Exchange2}
                    style={styles.ButtonBottomblue}
                  ></IconDetailCustom>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialogQRCode}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibilityQRCode}
          >
            <DialogQRCode
              onPressClose={() => showDialogQRCode()}
              IDCode={Data.QRCode}
            ></DialogQRCode>
          </Modal>
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog2}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility2}
          >
            <DialogPaymentCreditor
              SaleInvoiceClient={dataSaleInvoice}
              TotalPrice={TotalPriceBill.toString()}
              navigation={props.navigation}
              onPressClosePay={showDialogPayment}
            ></DialogPaymentCreditor>
          </Modal>
        </BackgroundDetailCellScreen>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(0.5),
    flex: 1,
    backgroundColor: '#fff',
  },
  containerheader: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    width: '100%',
    backgroundColor: '#c7ecee',
  },
  containerBody: {
    flex: 1,
    paddingVertical: hp(0.5),
  },
  containerBottom: {
    width: '100%',
    marginTop: hp(1),
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(13),
    flexDirection: 'column',
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#d8fcf7',
  },
  view_bottom: {
    width: '100%',
    marginTop: hp(1),
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(13),
    flexDirection: 'column',
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#d8fcf7',
  },
  text_bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },

  bottom: {
    width: '100%',
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  floatting_butotn: {
    width: wp(15),
    height: wp(15),
    borderRadius: 100,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: hp(20),
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonBottomgreen: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.greenscolor,
  },
  ButtonBottomblue: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.blue,
  },
  ButtonBottomsmoke: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.smokecolor,
  },
  ButtonFloating: {
    height: wp(14),
    width: wp(14),
    backgroundColor: '#dff9fb',
    position: 'absolute',
    bottom: hp(14.5),
    right: wp(3),
    borderRadius: wp(15),
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
  ImageBT2: {
    height: wp(6),
    width: wp(6),
  },
});
export default DetailAccptanceOther;
