import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  Modal,
  ToastAndroid,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailCellScreen } from '../../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemWaitingCreditor } from '../../../components/items/creditorSceen/ItemWaitingCreditor';
import { getSaleInvoiceCreditorWaitingReceiveOther } from './GetSaleInvoiceCreditorWaitingReceiveOther';
import { recievedSaleInvoiceCreditor } from './RecievedSaleInvoiceCreditor';
import lodash from 'lodash';
import { actionMain } from '../../../utils';
import { Fonts, mainColors } from '../../../constants/index';
import getDataByThing from '../../../utils/getDataByThing';
const CreditorWaitingReceiveOther = (props: any) => {
  const {
    TotalRow,
    handleLoadMore,
    search,
    data,
    setData,
    onPressSearch,
    searchString,
    setsearchString,
    pageIndex,
    setPageIndex,
  } = getSaleInvoiceCreditorWaitingReceiveOther(props);
  const { onPressAccept } = recievedSaleInvoiceCreditor(props);
  const [Show, setShow] = useState(false);
  const { BarCodee } = props.route.params;
  const [IsAbc, setIsAbc] = useState(0)
  const changeText = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };
  const getdata = async () => {
    await onPressSearch();
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };
  const onRefresh = () => {
    setShow(true);

    getdata();
  };
  const RecievedSaleInvoiceCreditor = async (ID: string, Index: any) => {
    try {
      actionMain.loading(true, '');
      if (await onPressAccept(ID)) {
        deleteData(Index);
      } else {
        actionMain.loading(false, '');
        actionMain.showModalWarm({
          status: true,
          title: 'Thông báo',
          content: 'Nhận phiếu bị lỗi!',
        });
      }
    } catch (E) {}
  };
  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data);
        actionMain.loading(false, '');
      }
    } catch (E) {}
  };
  useEffect(() => {
    if(searchString == BarCodee){
        onPressSearch(); 
    }else
    if(searchString == 'Nhập số chứng từ...' || searchString == ''){
      setData([])
    }
  }, [searchString])
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      
        if(BarCodee == 'Nhập số chứng từ...'){
         setsearchString('')
        }else{
          setsearchString(BarCodee)
        }
    });
    return () => {};
  }, []);
  const onPressItem = (value: any) => {
    for (var i = 0; i < data.length; i++) {
      if (i == value) {
        if (data[i].Status == true) {
          data[i].Status = false;
          setData([...data]);
        } else {
          data[i].Status = true;
          setData([...data]);
        }
      } else {
        data[i].Status = false;
        setData([...data]);
      }
    }
  };
//   const onScanSuccess = async (value: any) => {
//     if (value.nativeEvent.codeStringValue != '') {
//       props.navigation.goBack();
//       setsearchString(value.nativeEvent.codeStringValue);
//       await getdata();
//     }
//   };
  const onPressDetail = (data) => {
    props.navigation.navigate('DetailEnvoiceCreditor', { Data: data });
  };
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreen',  { type : 1 });
  };
  const goBack = () => {
    props.navigation.navigate('WaitingCreditor');
  }
  const viewData = (item, index) => {
    return (
      <View>
        <ItemWaitingCreditor
          onPressApply={() => RecievedSaleInvoiceCreditor(item.SaleInvoiceID, index)}
          onPressDetail={() => onPressDetail(item)}
          styleItem={index % 2 == 0 ? { backgroundColor: 'white' } : { backgroundColor: '#c7ecee' }}
          Status={item.Status}
          navigation={props.navigation}
          addressCustomer={item.ShipAddress}
          codeOrder={index + 1 + '. ' + item.Code}
          dateTime={getDataByThing.getDayMonthYearString(item.AccountingDate)}
          // invoiceWeight={item.TotalQuantity.toString()}
          nameCustomer={item.CustomerName}
          onPressItem={() => onPressItem(index)}
          typeItem={false}
          noteOder={item.Notes}
          customerCode={item.CustomerCode}
          index={index}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
        ></ItemWaitingCreditor>
      </View>
    );
  };
  return (
    <BackgroundDetailCellScreen goBack = {() => goBack()} title='Phiếu thu nợ' navigation={props.navigation}>
      <View style={styles.container}>
        <HeaderSearchCustom
          onScanSuccess={() => {}}
          onPressSearch={() => search()}
          onPressBarCode={() => onScanBarCode()}
          _onChangeText={changeText}
          value={searchString}
        ></HeaderSearchCustom>
        <View style={{ flex: 1 }}>
          {lodash.isEmpty(data) ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{ color: '#000', fontFamily: Fonts.Roboto_Slab_Regular, fontSize: wp(4.5) }}
              >
                Không tìm thấy phiếu nào...
              </Text>
            </View>
          ) : (
            <View style={{ width: '100%', height: '100%' }}>
              <FlatList
                refreshing={Show}
                onRefresh={onRefresh}
                data={data}
                initialNumToRender={20} // how many item to display first
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  handleLoadMore();
                }}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item, index }) => viewData(item, index)}
              />
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#000',
                  width: '100%',
                  height: wp(5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#5EB45F',
                    fontSize: hp(2.2),
                    fontStyle: 'italic',
                  }}
                >
                  {data.length}/{TotalRow}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </BackgroundDetailCellScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
  },
});
export default CreditorWaitingReceiveOther;
