
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
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  GHIM
} from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { ItemDetailCustomName } from '../../../components/items/homeScreen/ItemDetailCustomName';
import { ItemsDetailCustom } from '../../../components/items/homeScreen/ItemDetailCustom';
import { IconDetailCustom } from '../../../components/iconsCustom/IconDetailCustom';
import { getSaleInvoiceById } from './GetSaleInvoiceById';
import { getSaleInvoiceNotPrintById } from './GetSaleInVoiceNotPrintById';
import lodash from 'lodash';
import { Linking, Alert, Platform } from 'react-native';
import { receiveSaleInvoiceByID } from '../waiting/ReceiveSaleInvoiceByID';
import { getMerchandiseToDelivery } from '../acceptance/GetMerchandiseToDelivery';
import getDataByThing from '../../../utils/getDataByThing';
import { returnSaleInvoiceByID } from '../acceptance/ReturnSaleInvoiceNotStock';
import { DialogAccpetOrder } from '../../../components/modal/DialogAccpetOrder';
import { DialogRefuseOrder } from '../../../components/modal/DialogRefuseOrder';
import { DialogViewMap} from '../../../components/modal/DialogViewMap';
import { AcceptSaleInvoice } from '../submission/AcceptSaleInvoice';
import { RefuseOrderByID } from './RefuseOrderByID';
import { BackgroundDetailCellScreen } from '../../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import { getSaleInvoiceBycode } from './GetSaleInvoiceByCode';
import { getSaleInvoiceNotPrintBycode } from './GetSaleInvoiceNotPrintByCode';
import { DialogPaymentOrder } from '../../../components/modal/DialogPaymentOrder';
import { DialogQRCode } from '../../../components/modal/DialogQRCode';
import { receiveSaleInvoiceOtherByID } from '../waiting/ReceiveSaleInvoiceOrderByID';
import { receiveSaleInvoiceBycode } from '../waiting/ReceiveSaleInvoiceByCode';
import Toast from 'react-native-toast-message';
import GetLocation from 'react-native-get-location'
import { SetLocation } from './SetLocation'
const DetaiEnvoice = (props: any) => {
  const {
    GetDataType1,
    dataSaleInvoice,
    dataSaleInvoiceDetail,
    IDOrder,
    setIDSaleVoice,
    setdataSaleInvoiceDetail,
    setdataSaleInvoice
  } = getSaleInvoiceById(props);
  const { GetDataType2, dataSaleInvoice1, dataSaleInvoiceDetail1, IDOrder1, setIDSaleVoice1 } =
    getSaleInvoiceNotPrintById(props);
  const [Show, setShow] = useState(2);
  const [Type, setType] = useState('');
  const [TypeCode, setTypeCode] = useState('');
  const { SaleInvoiceID, setSaleInvoiceID, onPressAccept } =
    receiveSaleInvoiceByID(props);
  const {

    SaleInvoiceID1,
    setSaleInvoiceID1,
    onPressGetMerchand,

  } = getMerchandiseToDelivery(props);
  const { onPressSetLocation } = SetLocation(props)
  const [VisbleDialog, setVisbleDialog] = useState(false);
  const [VisbleDialog1, setVisbleDialog1] = useState(false);
  const [VisbleDialog2, setVisbleDialog2] = useState(false);
  const [VisbleDialogQRCode, setVisbleDialogQRCode] = useState(false);
  const [Index, setIndex] = useState(0);
  const { SaleInvoiceIDOrder, setSaleInvoiceIDOrder, onPressAcceptOrder } =
    receiveSaleInvoiceOtherByID(props);
  const { onPressReturn, SaleInvoiceID2, setSaleInvoiceID2 } =
    returnSaleInvoiceByID(props);
  const { SaleInvoiceID4, onPressSubmiss, setSaleInvoiceID4 } =
    AcceptSaleInvoice(props);

  const { Reason, onPressRefuse, setReason } =
    RefuseOrderByID(props);
  const { dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode, setdataSaleInvoiceDetailCode } =
    getSaleInvoiceBycode(props);
  const {

    dataSaleInvoiceDetailNotPrintCode,
    dataSaleInvoiceNotPrintCode,
    setdataSaleInvoiceNotPrintCode,
    setdataSaleInvoiceDetailNotPrintCode
  } = getSaleInvoiceNotPrintBycode(props);
  const { onPressCode } = receiveSaleInvoiceBycode(props);
  const [TotalPriceBill, setTotalPriceBill] = useState(0)
  const [LocationX, setLocationX] = useState('')
  const [LocationY, setLocationY] = useState('')
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




  const onPressAccpectItem = async () => {
    if (Type == '1' || TypeCode=='Code1') {
      setSaleInvoiceID(SaleInvoiceID);
      if (SaleInvoiceID != '') {
        if (await onPressAccept(SaleInvoiceID)) {

          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();

        }
        else {

          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });


        }
      }
    } else if (Type == '3' ||TypeCode=='Code3') {
      await setSaleInvoiceID1(SaleInvoiceID1);
      if (SaleInvoiceID1 != '') {

        if (await onPressGetMerchand(SaleInvoiceID1)) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();

        }
        else {

          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });


        }
      }
    // } 
    // else if (Type == '4'|| TypeCode=='Code4') {
    //   await setSaleInvoiceID4(SaleInvoiceID4);
    //   if (SaleInvoiceID4 != '') {
        // if (await onPressSubmiss(SaleInvoiceID4)) {

        //   Toast.show({
        //     type: 'success',
        //     text1: 'Thao Tác Thành Công',
        //   });
        //   props.navigation.goBack();

        // }
        // else {

        //   Toast.show({
        //     type: 'error',
        //     text1: 'Thao Tác Không Thành Công',
        //   });

        // }
      // }
    } else if (Type == '5'|| TypeCode=='Code5') {
      showDialogPayment(1);
    }
    if (Type == '7' || TypeCode=='Code7') {
      await setSaleInvoiceID2(SaleInvoiceID2);
      if (SaleInvoiceID2 != '') {

        if (await onPressReturn(SaleInvoiceID2)) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
        else {

          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });

        }
      }
    } else if (Type == '11' || TypeCode=='Code11') {
      await setSaleInvoiceIDOrder(SaleInvoiceIDOrder);
      if (SaleInvoiceIDOrder != '') {

        if (await onPressAcceptOrder(SaleInvoiceIDOrder)) {

          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();

        }
        else {

          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });

        }
      }
    } else if (Type == 'CodeLoi') {
      setSaleInvoiceID(SaleInvoiceID);
      if (SaleInvoiceID != '') {

        if (await onPressCode(SaleInvoiceID)) {

          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });

        }
      }
    }
  };
  useEffect(() => {
    setLocation()
  }, [LocationY])
  const setLocation = async () => {
    if (Show != 2) {
      if (await onPressSetLocation(dataSaleInvoice.AddressID, LocationX, LocationY)) {
        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Vui Lòng Thử Lại '
        });
      }
    }

  }
  const checkLocation = () => {
    if (Show != 2) {
      try {

        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 1500,
        })
          .then(location => {
            // Toast.show({
            //   type: 'success',
            //   text1: 'x: ' + location.latitude.toString(),
            //   text2: 'y: ' + location.longitude.toString(),
            // });
           
            setLocationX(location.latitude.toString())
            setLocationY(location.longitude.toString())
       
          })
          .catch(error => {
            const { code, message } = error;
            Toast.show({
              type: 'error',
              text1: 'Vui Lòng Kiểm Tra Lại Thiết Bị'
            });
          })
      } catch (E) {
        Toast.show({
          type: 'error',
          text1: 'Vui Lòng Thử Lại'
        });
      }

    }

  }
  const getData = async () => {
    try {
      const TypeAPI = await props.route.params.TypeAPI;
      const ID = await props.route.params.IDOrder;
      setIDSaleVoice(ID);
      setIDSaleVoice1(ID);
      setSaleInvoiceID2(ID);
      setSaleInvoiceID1(ID);
      setSaleInvoiceID(ID);
      setSaleInvoiceID4(ID);
      setSaleInvoiceIDOrder(ID);
      setdataSaleInvoiceCode(ID);
      await setType(TypeAPI);
      if (TypeAPI == '2') {
        if (ID != '') {
          await GetDataType2(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail1)) {
            let a = 1;
            setShow(a);
          }
        }
      } else if (TypeAPI == '11') {
        if (ID != '') {
          await GetDataType1(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail)) {
            let a = 1;
            setShow(a);
          }
        }
      } else if (TypeAPI == 'Code') {
        const getDataSaleInvoiceCode = await props.route.params.data;
        setdataSaleInvoiceCode(getDataSaleInvoiceCode)
        setdataSaleInvoice(getDataSaleInvoiceCode)

        const getDataSaleInvoiceDetailCode = await props.route.params.datadetail;
        setdataSaleInvoiceDetailCode(getDataSaleInvoiceDetailCode)
        setdataSaleInvoiceDetail(getDataSaleInvoiceDetailCode)
        
        if (getDataSaleInvoiceCode.SaleInvoiceStatus == 3) {
          setTypeCode('Code3')
          let a = 1;
          setShow(a);
        } else if (getDataSaleInvoiceCode.SaleInvoiceStatus == 2) {
          setTypeCode('Code7')
          let a = 1;
          setShow(a);
        } else if (getDataSaleInvoiceCode.SaleInvoiceStatus == 1) {
          setTypeCode('Code1')
          let a = 1;
          setShow(a);
        } else if (getDataSaleInvoiceCode.SaleInvoiceStatus == 4) {
          setTypeCode('Code5')
          let a = 1;
          setShow(a);
        }
        else if (getDataSaleInvoiceCode.SaleInvoiceStatus == 5) {
          setTypeCode('Code4')
          let a = 1;
          setShow(a);
        }
        else if (getDataSaleInvoiceCode.SaleInvoiceStatus == 8) {
          setTypeCode('Code6')
          let a = 1;
          setShow(a);
        }

      } else if (TypeAPI == 'CodeNotPrint') {
        const dataSaleInvoiceNotCode = await props.route.params.data;
        setdataSaleInvoiceNotPrintCode(dataSaleInvoiceNotCode)
        const dataSaleInvoiceDetailNotCode = await props.route.params.datadetail;
        setdataSaleInvoiceDetailNotPrintCode(dataSaleInvoiceDetailNotCode)
        let a = 1;
        setShow(a);
      } else {
        if (ID != '') {
          await GetDataType1(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail)) {
            let a = 1;
            setShow(a);

          }
        }
      }
    } catch (E) { }
  };
  const toggleModalVisibility = () => {
    setVisbleDialog(!VisbleDialog);
  };
  const toggleModalVisibility1 = () => {
    setVisbleDialog1(!!VisbleDialog1);
  };
  const toggleModalVisibilityQRCode = () => {
    setVisbleDialogQRCode(!!VisbleDialogQRCode);
  };
  const toggleModalVisibility2 = () => {
    setVisbleDialog2(!!VisbleDialog2);
  };
  const showDialog = (index: any) => {
    SumTotalPrice()
    if (VisbleDialog == true) {
      setVisbleDialog(false);
    } else {
      setIndex(index);
      setVisbleDialog(true);
    }
  };
  const acceptRefuseOrderByID = async () => {
    if (Reason != '') {
      if (await onPressRefuse(
        Type == '2'
          ? dataSaleInvoice1.SaleInvoiceID
          : Type == '11'
            ? dataSaleInvoice.SaleInvoiceID
            : dataSaleInvoice.SaleInvoiceID
      )) {

        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công',
        });
        setVisbleDialog1(false);
        props.navigation.goBack();
      }
      else {

        Toast.show({
          type: 'error',
          text1: 'Thao Tác Không Thành Công',
        });

      }
    }
  };
  const showDialogrefuse = (value: any) => {
    if (VisbleDialog1 == true) {
      setVisbleDialog1(false);
    } else {
      setVisbleDialog1(true);
    }
  };

  const showDialogPayment = (value: any) => {
    if (VisbleDialog2 == true) {
      setVisbleDialog2(false);
    } else {
      setVisbleDialog2(true);
    }
  };
  const showDialogQRCode = () => {
    if (VisbleDialogQRCode == true) {
      setVisbleDialogQRCode(false);
    } else {
      setVisbleDialogQRCode(true);
    }
  };
  useEffect(() => {
    SumTotalPrice()
  }, [Show])

  useEffect(() => {
    setTotalPriceBill(TotalPriceBill)
  }, [TotalPriceBill])
 
  /// hàm tính tổng tiền
  const SumTotalPrice = async () => {
    try {
      if (Show != 2) {
        let abc = 0;
        setTotalPriceBill(abc)
        if (Type == '2') {
          let a = 0;
          for (var i = 0; i < dataSaleInvoiceDetail1.length; i++) {
            let Amount = 0;
            let DiscountAmount = 0;
            let TaxAmount = 0;
            let TotalAmount = 0;
            Amount = dataSaleInvoiceDetail1[i].Quantity * dataSaleInvoiceDetail1[i].Price
            DiscountAmount = Amount * (dataSaleInvoiceDetail1[i].DiscountPercent / 100)
            TaxAmount = (Amount - DiscountAmount) * (dataSaleInvoiceDetail1[i].TaxPercent / 100)
            TotalAmount = Amount - DiscountAmount + TaxAmount;
            a = a + Number.parseInt(TotalAmount.toFixed(0))
          }
          setTotalPriceBill(a)
          ///
        }
        else if (Type == 'CodeNotPrint') {
          let a = 0;
          for (var i = 0; i < dataSaleInvoiceDetailNotPrintCode.length; i++) {
            let Amount = 0;
            let DiscountAmount = 0;
            let TaxAmount = 0;
            let TotalAmount = 0;
            Amount = dataSaleInvoiceDetailNotPrintCode[i].Quantity * dataSaleInvoiceDetailNotPrintCode[i].Price
            DiscountAmount = Amount * (dataSaleInvoiceDetailNotPrintCode[i].DiscountPercent / 100)
            TaxAmount = (Amount - DiscountAmount) * (dataSaleInvoiceDetailNotPrintCode[i].TaxPercent / 100)
            TotalAmount = Amount - DiscountAmount + TaxAmount;
            a = a + Number.parseInt(TotalAmount.toFixed(0))

          }
          setTotalPriceBill(a)
        }
        else if (Type == 'Code') {
          let a = 0;
          for (var i = 0; i < dataSaleInvoiceDetailCode.length; i++) {
            let Amount = 0;
            let DiscountAmount = 0;
            let TaxAmount = 0;
            let TotalAmount = 0;
            Amount = dataSaleInvoiceDetailCode[i].Quantity * dataSaleInvoiceDetailCode[i].Price
            DiscountAmount = Amount * (dataSaleInvoiceDetailCode[i].DiscountPercent / 100)
            TaxAmount = (Amount - DiscountAmount) * (dataSaleInvoiceDetailCode[i].TaxPercent / 100)
            TotalAmount = Amount - DiscountAmount + TaxAmount;
            a = a + Number.parseInt(TotalAmount.toFixed(0))

          }
          setTotalPriceBill(a)
        }
        else if (Type == '11') {
          let a = 0;
          for (var i = 0; i < dataSaleInvoiceDetail.length; i++) {
            let Amount = 0;
            let DiscountAmount = 0;
            let TaxAmount = 0;
            let TotalAmount = 0;
            Amount = dataSaleInvoiceDetail[i].Quantity * dataSaleInvoiceDetail[i].Price
            DiscountAmount = Amount * (dataSaleInvoiceDetail[i].DiscountPercent / 100)
            TaxAmount = (Amount - DiscountAmount) * (dataSaleInvoiceDetail[i].TaxPercent / 100)
            TotalAmount = Amount - DiscountAmount + TaxAmount;
            a = a + Number.parseInt(TotalAmount.toFixed(0))
          }
          setTotalPriceBill(a)
        }
        else {
          let a = 0;
          for (var i = 0; i < dataSaleInvoiceDetail.length; i++) {
            let Amount = 0;
            let DiscountAmount = 0;
            let TaxAmount = 0;
            let TotalAmount = 0;
            Amount = dataSaleInvoiceDetail[i].Quantity * dataSaleInvoiceDetail[i].Price
            DiscountAmount = Amount * (dataSaleInvoiceDetail[i].DiscountPercent / 100)
            TaxAmount = (Amount - DiscountAmount) * (dataSaleInvoiceDetail[i].TaxPercent / 100)
            TotalAmount = Amount - DiscountAmount + TaxAmount;
            a = a + Number.parseInt(TotalAmount.toFixed(0))
          }
          setTotalPriceBill(a)
        }
      }
    }
    catch (E) {

    }

  }
 
  const onTextChange = (value: any) => {
    if (value == '') {
    } else {
      setReason(value);
    }
  };
  const onTextTakeChange = (value: any) => {
    if (value == '' || value > dataSaleInvoiceDetail[Index].QuantityOrg) {

    } else {
      dataSaleInvoiceDetail[Index].Quantity = value;
      setdataSaleInvoiceDetail(dataSaleInvoiceDetail);
    }
  };

  
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getData()
    });
    return () => { };
  }, []);
  // Item Chính
  const viewItemHeader = () => {
    return (
      <ItemDetailCustomName
        styleItem={{ backgroundColor: '#c7ecee', marginBottom: 10 }}
        addressCustomer={
          Type == '2'
            ? dataSaleInvoice1.ShipAddress
            : Type == '11'
              ? dataSaleInvoice.ShipAddress
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.ShipAddress
                : Type == 'Code'
                  ? dataSaleInvoiceCode.ShipAddress
                  : dataSaleInvoice.ShipAddress
        }
        codeOrder={
          Type == '2'
            ? dataSaleInvoice1.Code
            : Type == '11'
              ? dataSaleInvoice.Code
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.Code
                : Type == 'Code'
                  ? dataSaleInvoiceCode.Code
                  : dataSaleInvoice.Code
        }
        dateTime={
          Type == '2'
            ? dataSaleInvoice1.DeliveryDate
            : Type == '11'
              ? dataSaleInvoice.DeliveryDate
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.DeliveryDate
                : Type == 'Code'
                  ? dataSaleInvoiceCode.DeliveryDate
                  : dataSaleInvoice.DeliveryDate
        }
        invoiceWeight={
          Type == '2'
            ? dataSaleInvoice1.TotalQuantity.toString()
            : Type == '11'
              ? dataSaleInvoice.TotalQuantity.toString()
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.TotalQuantity.toString()
                : Type == 'Code'
                  ? dataSaleInvoiceCode.TotalQuantity.toString()
                  : dataSaleInvoice.TotalQuantity.toString()
        }
        nameCustomer={
          Type == '2'
            ? dataSaleInvoice1.CustomerName
            : Type == '11'
              ? dataSaleInvoice.CustomerName
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.CustomerName
                : Type == 'Code'
                  ? dataSaleInvoiceCode.CustomerName
                  : dataSaleInvoice.CustomerName
        }
        onPressItem={() => {
          showDialogQRCode();
        }}
        customerCode={
          Type == '2'
            ? dataSaleInvoice1.CustomerCode
            : Type == '11'
              ? dataSaleInvoice.CustomerCode
              : Type == 'CodeNotPrint'
                ? dataSaleInvoiceNotPrintCode.CustomerCode
                : Type == 'Code'
                  ? dataSaleInvoiceCode.CustomerCode
                  : dataSaleInvoice.CustomerCode
        }
        typeItem={true}
        noteOder={
          Type == '2'
            ? dataSaleInvoice1.Notes
            : Type == '11'
              ? dataSaleInvoice.Notes
              : Type == 'Code'
                ? dataSaleInvoiceCode.Notes
                : Type == 'CodeNotPrint'
                  ? dataSaleInvoiceNotPrintCode.Notes
                  : dataSaleInvoice.Notes
        }
        sourceIcon={BarCode}
        Option={'0'}
        type={'0'}
      ></ItemDetailCustomName>
    )
  }
  // dữ liệu phiếu chờ nhận chưa in
  const viewDataNotPrint = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => 'key' + index}
        data={dataSaleInvoiceDetail1}
        renderItem={({ item, index }) => (
          <ItemsDetailCustom
            nameItem={index + 1 + '. ' + item.ProductName}
            onPressItem={{}}
            quantityItem={item.Quantity.toString()}
            unitItem={item.UnitName}
            indexItem={index}
            titleItem={item.Notes}
            index={index.toString()}
            type={Type.toString()}
          ></ItemsDetailCustom>
        )}
      ></FlatList>
    )
  }
  const viewData = () => {
    return(
      <FlatList
      keyExtractor={(item, index) => 'key' + index}
      data={dataSaleInvoiceDetail}
      renderItem={({ item, index }) => (
        <ItemsDetailCustom
        nameItem={index + 1 + '. ' + item.ProductName}
        onPressItem={{}}
        quantityItem={item.Quantity.toString()}
        unitItem={item.UnitName}
        indexItem={index}
        titleItem={item.Notes}
        index={index}
        styleItem={{ backgroundColor: mainColors.whiteColor }}
      ></ItemsDetailCustom>
      )}
    ></FlatList>
    )
  }
  // dữ liệu phiếu bằng code
  const viewDataByCode = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => 'key' + index}
        data={dataSaleInvoiceDetailCode}
        renderItem={({ item, index }) => (
          <ItemsDetailCustom
            nameItem={index + 1 + '. ' + item.ProductName}
            onPressItem={{}}
            quantityItem={item.Quantity.toString()}
            unitItem={item.UnitName}
            indexItem={index}
            titleItem={item.Notes}
            index={index}
            styleItem={{ backgroundColor: mainColors.whiteColor }}
          ></ItemsDetailCustom>
        )}
      ></FlatList>)
  }
  // dữ liệu phiếu chưa in bằng code
  const viewDataNotPrintByCode = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => 'key' + index}
        data={dataSaleInvoiceDetailNotPrintCode}
        renderItem={({ item, index }) => (
          <ItemsDetailCustom
            nameItem={index + 1 + '. ' + item.ProductName}
            onPressItem={{}}
            quantityItem={item.Quantity.toString()}
            unitItem={item.UnitName}
            indexItem={index}
            titleItem={item.Notes}
            index={index}
            styleItem={{ backgroundColor: mainColors.whiteColor }}
          ></ItemsDetailCustom>
        )}
      ></FlatList>
    )
  }
  // dữ liệu phiếu
  const viewDataOrder = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => 'key' + index}
        data={dataSaleInvoiceDetail}
        renderItem={({ item, index }) => (
          <ItemsDetailCustom
            nameItem={index + 1 + '. ' + item.ProductName}
            onPressDialog={showDialog}
            onPressItem={{}}
            quantityItem={item.Quantity.toString()}
            unitItem={item.UnitName}
            indexItem={index}
            titleItem={item.Notes}
            type={Type}
            index={index}
            styleItem={{ backgroundColor: mainColors.whiteColor }}
          ></ItemsDetailCustom>
        )}
      ></FlatList>
    )
  }
  /// view icon gọi
  const viewIconCall = () => {
    return (
      <IconDetailCustom
        iconShow={true}
        onPress={() => {
          {
            Type == '2'
              ? CallCustomer(dataSaleInvoice1.CustomerPhone)
              : Type == '11'
                ? CallCustomer(dataSaleInvoice.CustomerPhone)
                : Type == 'Code'
                  ? CallCustomer(dataSaleInvoiceCode.CustomerPhone)
                  : Type == 'CodeNotPrint'
                    ? CallCustomer(dataSaleInvoiceNotPrintCode.CustomerPhone)
                    : CallCustomer(dataSaleInvoice.CustomerPhone);
          }
        }}
        labelStyle={{ color: mainColors.whiteColor, fontSize: wp(4) }}
        title={'Gọi'}
        sourceICon={Phone}
        style={styles.ButtonBottomgreen}
      ></IconDetailCustom>
    )
  }
  /// view icon không giao được 
  const viewIconNotHandout = () => {
    return (
      Type == '5'|| TypeCode=='Code5' ? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => showDialogrefuse(1)}
          labelStyle={{ color: mainColors.blackColor, fontSize: wp(3.3), }}
          title={'Không Giao Được'}
          sourceICon={Cancel}
          style={styles.ButtonBottomsmoke}
        ></IconDetailCustom>
      ) : (
        <View></View>
      )
    )
  }
  //view icon Accept
  const viewIconAccpect = () => {
    return (
      Type == '1' || Type == '11' ||TypeCode=='Code1'||TypeCode=='Code11' ? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => onPressAccpectItem()}
          labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
          title={'Nhận Phiếu'}
          sourceICon={Check}
          type={Type}
          SaleVoiceID={
            lodash.isEmpty(dataSaleInvoice1)
              ? dataSaleInvoice.SaleInvoiceID
              : dataSaleInvoice1.SaleInvoiceID
          }
          style={styles.ButtonBottomgreen}
        ></IconDetailCustom>
      ) : Type == 'CodeLoi' ? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => onPressAccpectItem()}
          labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
          title={'Nhận Phiếu'}
          sourceICon={Check}
          type={Type}
          SaleVoiceID={
            lodash.isEmpty(dataSaleInvoiceCode)
              ? dataSaleInvoice.SaleInvoiceID
              : dataSaleInvoiceCode.SaleInvoiceID
          }
          style={styles.ButtonBottomgreen}
        ></IconDetailCustom>
      ) : Type == '3' || TypeCode=='Code3'? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => onPressAccpectItem()}
          labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
          title={'Nhận Hàng'}
          sourceICon={Check}
          type={Type}
          SaleVoiceID={
            lodash.isEmpty(dataSaleInvoice1)
              ? dataSaleInvoice.SaleInvoiceID
              : dataSaleInvoice1.SaleInvoiceID
          }
          style={styles.ButtonBottomgreen}
        ></IconDetailCustom>
      ): Type == '5'|| TypeCode=='Code5' ? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => onPressAccpectItem()}
          labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
          title={'Thanh Toán'}
          sourceICon={Check}
          type={Type}
          SaleVoiceID={
            lodash.isEmpty(dataSaleInvoice1)
              ? dataSaleInvoice.SaleInvoiceID
              : dataSaleInvoice1.SaleInvoiceID
          }
          style={styles.ButtonBottomgreen}
        ></IconDetailCustom>
      ) 
      // : Type == '4'|| TypeCode=='Code4' ? (
      //   <IconDetailCustom
      //     iconShow={true}
      //     onPress={() => onPressAccpectItem()}
      //     labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
      //     title={'Nộp Phiếu'}
      //     sourceICon={Check}
      //     type={Type}
      //     SaleVoiceID={
      //       lodash.isEmpty(dataSaleInvoice1)
      //         ? dataSaleInvoice.SaleInvoiceID
      //         : dataSaleInvoice1.SaleInvoiceID
      //     }
      //     style={styles.ButtonBottomgreen}
      //   ></IconDetailCustom>)
        : (
          <View></View>
        )
    )
  }
  /// view nút trả phiếu 
  const viewIconReturnOrder = () => {
    return (
      Type == '7'|| TypeCode=='Code7' ? (
        <IconDetailCustom
          iconShow={true}
          onPress={() => onPressAccpectItem()}
          labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
          title={'Trả Phiếu'}
          sourceICon={Exchange2}
          type={Type}
          SaleVoiceID={
            lodash.isEmpty(dataSaleInvoice1)
              ? dataSaleInvoice.SaleInvoiceID
              : dataSaleInvoice1.SaleInvoiceID
          }
          style={styles.ButtonBottomblue}
        ></IconDetailCustom>
      ) : (
        <View></View>
      )
    )
  }
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackgroundDetailCellScreen goBack = {() => goBack()} title='Chi Tiết Phiếu' navigation={props.navigation}>
          {Show == 2 ? (
            <View
              style={{
                width: wp(100),
                height: hp(95),
                backgroundColor: '#fff',
                flexDirection: 'column',
                padding: 3,
              }}
            ></View>
          ) : (
            < View style={styles.container}>
              {viewItemHeader()}
              {Type == '2' ? (

                viewDataNotPrint()

              ) : Type == '11' ? (

                viewData()

              ) : Type == 'Code' ? (

                viewDataByCode()

              ) : Type == 'CodeNotPrint' ? (
                viewDataNotPrintByCode()
              ) : (

                viewDataOrder()

              )}

              <View style={styles.view_bottom}>
                <View style={styles.text_bottom}>
                  <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: 'red' }}>
                    Tổng Tiền:
                  </Text>
                  <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: 'red' }}>
                    {Show != 2 ?

                      getDataByThing.getcurrency(TotalPriceBill.toString()) +
                      ' VNĐ'

                      : 0}

                  </Text>
                </View>

                <View style={styles.bottom}>
                  <Toast style={{ paddingBottom: hp(5) }} position={'bottom'} visibilityTime={5} ref={(ref) => Toast.setRef(ref)} />
                  {/* nút gọi nè */}
                  {viewIconCall()}
                  {/* nút không giao được nè */}
                  {viewIconNotHandout()}
                  {/* nút nhận phiếu */}
                  {viewIconAccpect()}
                  {/* nút trả phiếu */}
                  {viewIconReturnOrder}
                </View>
              </View>
            </View>
          )}

          {/* ShowDialog Nhận Đơn */}
          {VisbleDialog == true ? (
            <Modal
              animationType='slide'
              transparent
              visible={VisbleDialog}
              presentationStyle='formSheet'
              style={{ justifyContent: 'flex-end', margin: 0 }}
              onDismiss={toggleModalVisibility}
            >
              <DialogAccpetOrder
                onTextTakeChange={onTextTakeChange}
                onTextChange={onTextChange}
                noteOrder={
                  lodash.isEmpty(dataSaleInvoiceDetail) ? '' : dataSaleInvoiceDetail[Index].Notes
                }
                noteUser={'nhập ghi chú khách hàng'}
                onPressAcpect={showDialog}
                onPressClose={showDialog}
                quanlitiPut={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].QuantityOrg.toString()
                }
                quanlitiTake={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].Quantity.toString()
                }
                title={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].ProductName
                }
              ></DialogAccpetOrder>
            </Modal>
          ) : (
            <View></View>
          )}
          {/* ShowDialog Từ Chối Đơn */}
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog1}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility1}
          >
            <DialogRefuseOrder
              onTextChange={onTextChange}
              onPressAcpect={() => acceptRefuseOrderByID()}
              onPressClose={() => showDialogrefuse(1)}
            ></DialogRefuseOrder>
          </Modal>

          {/* ShowDialog QR CODE*/}

          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialogQRCode}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibilityQRCode}
          >
            <DialogQRCode onPressClose={() => showDialogQRCode()}
              IDCode={Show != 2
                ? Type == '2'
                  ? dataSaleInvoice1.QRCode
                  : Type == '11'
                    ? dataSaleInvoice.QRCode
                    : Type == 'CodeNotPrint'
                      ? dataSaleInvoiceNotPrintCode.QRCode
                      : Type == 'Code'
                        ? dataSaleInvoiceCode.QRCode
                        : dataSaleInvoice.QRCode
                : 0
              }
            ></DialogQRCode>
          </Modal>
          {/* ShowDialog Thanh Toán Đơn */}
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog2}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility2}
          >
            <DialogPaymentOrder
              SaleInvoiceClient={
                Type == '2'
                  ? dataSaleInvoice1
                  : Type == '11'
                    ? dataSaleInvoice
                    : Type == 'Code'
                      ? dataSaleInvoiceCode
                      : dataSaleInvoice
              }
              TotalPrice={
                Show != 2 ?
                  TotalPriceBill.toString()
                  : 0
              }
              SaleInvoiceDetailClient={
                Type == '2'
                  ? dataSaleInvoiceDetail1
                  : Type == '11'
                    ? dataSaleInvoiceDetail
                    : Type == 'Code'
                      ? dataSaleInvoiceDetailCode
                      : dataSaleInvoiceDetail
              }
              navigation={props.navigation}
              onPressClosePay={showDialogPayment}

            ></DialogPaymentOrder>
          </Modal>
          {Type == '5' ? <Ripple onPressIn={() => checkLocation()} style={[styles.ButtonFloating,
          Platform.OS == 'ios'
            ? styles.shadowIos
            : styles.shadowAndroid,
          ]}>
            <Image style={styles.ImageBT2} source={GHIM} />
          </Ripple> : <View></View>}
        </BackgroundDetailCellScreen>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(0.5),
    flex: 1,
    backgroundColor: '#fff',
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

  }
});
export default DetaiEnvoice;
