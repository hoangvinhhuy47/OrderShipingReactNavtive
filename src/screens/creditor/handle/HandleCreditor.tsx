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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailCreditorScreen } from '../../../components/backgroundScreen/backgroudDetailCreditorScreen/BackgroundDetailCreditorScreen.view';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemHandleCreditor } from '../../../components/items/creditorSceen/ItemHandleCreditor';
import { GetSaleInvoiceCreditorReceived } from './GetSaleInvoiceCreditorReceived';
import lodash from 'lodash';
import { returnSaleInvoiceCreditor } from './ReturnSaleInvoiceCreditor';
import { actionMain } from '../../../utils';
const HandleCreditor = (props: any) => {
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
  } = GetSaleInvoiceCreditorReceived(props);
  const { onPressReturnSaleInvoiceCreditor } = returnSaleInvoiceCreditor(props);
  const [Show, setShow] = useState(false)
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
      setShow(false)
    }, 1000)
  };
  const onRefresh = () => {
    setShow(true)

    getdata()
  }
  const ReturnSaleInvoiceCreditor = async (ID: string, Index: any) => {
    try {
        actionMain.loading(true, '');
        if (await onPressReturnSaleInvoiceCreditor(ID)) {
          deleteData(Index)
        }
        else {
          actionMain.loading(false, '');
          actionMain.showModalWarm({
            status: true,
            title: 'Thông báo',
            content: 'Trả phiếu bị lỗi!',
          });     
        }
  
      } catch (E) { }
  }
  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data);
        actionMain.loading(false, '');
      }
    } catch (E) { }
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setData([]);
      getdata();
      setPageIndex(1);
      setsearchString('');
    });
    return () => { };
  }, []);
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
  const onPressDetail = data => {
    props.navigation.navigate('DetailEnvoiceCreditor', { Data: data});
  }
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail', { type: 4 });
  };
  const viewData = (item, index) => {
    return (
      <View>
        <ItemHandleCreditor
          onPressPayVotes = {() => ReturnSaleInvoiceCreditor(item.SaleInvoiceID, index)}
          onPressDetail = {() => onPressDetail(item)}
          styleItem={index % 2 == 0 ? { backgroundColor: 'white' } : { backgroundColor: '#c7ecee' }}
          Status={item.Status}
          navigation={props.navigation}
          addressCustomer={item.ShipAddress}
          codeOrder={index + 1 + '. ' + item.Code}
          dateTime={item.AccountingDate}
          nameCustomer={item.CustomerName}
          onPressItem={() => onPressItem(index)}
          typeItem={false}
          noteOder={item.Notes}
          customerCode={item.CustomerCode}
          index={index}
          SaleVoiceID={item.SaleInvoiceID}
          PhoneNumBer={item.CustomerPhone}
        ></ItemHandleCreditor>
      </View>
    )
  }
  return (
    <BackgroundDetailCreditorScreen title='2. Xử lý' navigation={props.navigation}>
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
          <View></View>
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
              renderItem={({ item, index }) => (viewData(item, index))}
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
    </BackgroundDetailCreditorScreen>
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
export default HandleCreditor;
