import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, ToastAndroid, Modal } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Cancel, Receiver } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { searchSaleInvoiceNotReceive } from './GetOrderByAnotherGuy';
import { ItemPrintedCustom } from '../../../components/items/homeScreen/ItemPrintedCustom';
import { receiveSaleInvoiceOtherByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceOrderByID';
import lodash from 'lodash';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';
import { actionMain } from '../../../utils';

const SearchProduct = (props: any) => {
  const { navigation } = props;
  const {
    SaleInvoiceIDOrder,
    setUserID,
    setSaleInvoiceIDOrder,

    onPressAcceptOrder,
  } = receiveSaleInvoiceOtherByID(props);

  const { TotalRow, handleLoadMore, search, data, onPressSearch, setPageIndex, setsearchString, searchString, setData, pageIndex } =
    searchSaleInvoiceNotReceive(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);

  const onTextChange = (value: any) => {
    if (value != '') {
      setsearchString(value);
    }
  };
  const onScanSuccess = async (value: any) => {
    if (value.nativeEvent.codeStringValue != '') {
      props.navigation.goBack();
      setsearchString(value.nativeEvent.codeStringValue);
      await onGetData();
    }
  };
  const onGetData = async () => {
    if (searchString != '') {
      await onPressSearch();
    }
  };
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreen', { onScanSuccess, type : 2 });
  };

  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data)
        actionMain.loading(false, '');
      }
    }
    catch (E) { }
  }
  useEffect(() => {
    setsearchString('');

    return () => { };
  }, []);
  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    try {        
     
      
        actionMain.loading(true, '');
        if (await onPressAcceptOrder(ID)) {
          deleteData(Index)
        }
        else {
          actionMain.loading(false, '');
          Toast.show({
            type: 'error',
            text1: 'Thao Tác Không Thành Công',
          });

        }
      
    } catch (E) { 
      Toast.show({
        type: 'error',
        text1: 'Thao Tác Không Thành Công',
      });
    }
  };

  const onPressItem = (value: any) => {
    for (var i = 0; i < data.length; i++) {
      if (i == value) {
        if (data[i].Status == true) {
          data[i].Status = false;
          setData([...data])
        } else {
          data[i].Status = true;
          setData([...data])
        }
      }
      else {
        data[i].Status = false;
        setData([...data])
      }
    }
  }
  useEffect(() => {

  }, [data])

  return (
    <View style={styles.containerBig}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: hp(3), height: hp(3) }}></View>
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'white',
              fontFamily: Fonts.Roboto_Stab_Bold,
              marginRight: 5,
              fontWeight: 'bold',
            }}
          >
            {' '}
            Phiếu Giao Hàng
          </Text>
          <Ripple onPress={props.navigation.goBack}>
            <Image
              source={Cancel}
              style={{ width: hp(4), height: hp(4) }}
            ></Image>
          </Ripple>
        </View>
        <View style={styles.hedaerSearch}>
          <HeaderSearchCustom
            onPressSearch={() => search()}
            _onChangeText={onTextChange}
            value={searchString}
            onPressBarCode={() => onScanBarCode()}
          ></HeaderSearchCustom>
        </View>

        {lodash.isEmpty(data) ? (
          <View>
            <Text> Không tìm được phiếu giao hàng</Text>
          </View>
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            <FlatList
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              initialNumToRender={20} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              renderItem={({ item, index }) => (
                <View style={{ paddingHorizontal: wp(1) }}>
                  {index % 2 == 0 ? (
                    <ItemPrintedCustom
                      Status={item.Status}
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => onPressItem(index)}
                      typeItem={false}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      customerCode={item.CustomerCode}
                      Option={'1'}
                      type={'11'}
                      index={index}
                      onPressAcept={ReceiveSaleInvoiceByID}
                      SaleVoiceID={item.SaleInvoiceID}
                      onPressClose={() => { }}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemPrintedCustom>
                  ) : (
                    <ItemPrintedCustom
                      Status={item.Status}
                      styleItem={{ backgroundColor: mainColors.colorItem }}
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => onPressItem(index)}
                      typeItem={false}
                      index={index}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      onPressClose={() => { }}
                      customerCode={item.CustomerCode}
                      Option={'1'}
                      type={'11'}
                      onPressAcept={ReceiveSaleInvoiceByID}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemPrintedCustom>
                  )}
                </View>
              )}
            />
            <View style={{ borderTopColor: '#000', borderTopWidth: 1, width: '100%', height: wp(5.5), justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
              <Text style={{ fontWeight: '700', color: '#5EB45F', fontSize: hp(2.2), fontStyle: 'italic', }}>{data.length}/{TotalRow}</Text>
            </View>
          </View>
        )}

        <Modal
          animationType='slide'
          transparent
          visible={VisbleDialogError}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
        </Modal>
      </View>
      <Toast position={'top'} visibilityTime={3} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerBig: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: wp(1),
    backgroundColor: mainColors.greenscolor,
    height: hp(6),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hedaerSearch: {
    marginTop: hp(1),

    height: hp(10),
  },
  viewData: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SearchProduct;
